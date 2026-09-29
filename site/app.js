// Wires the page to config.js: the ask buttons, the lead form, and the
// funnel events that land in Supabase. What is measured: docs/measure.md.

(function () {
  const cfg = window.SPARK_CONFIG || {};
  const ask = cfg.ask || {};
  const db = cfg.supabase || {};

  // --- Who and where from ---------------------------------------------------
  // Two anonymous ids, no cookies: visitor_id stays in this browser, so a
  // person counts once however often they come back; session_id lasts one
  // visit.
  function uid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "v-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 10);
  }
  function kept(store, key) {
    try {
      let v = store.getItem(key);
      if (!v) { v = uid(); store.setItem(key, v); }
      return v;
    } catch (e) { return uid(); }
  }
  const visitorId = kept(localStorage, "visitor_id");
  const sessionId = kept(sessionStorage, "session_id");

  // Source: ?ref=… or ?utm_source=… on any link you post; otherwise the site
  // that sent the visitor; otherwise "direct". Kept for the whole visit.
  const params = new URLSearchParams(location.search);
  let referrer = "";
  try { referrer = document.referrer ? new URL(document.referrer).hostname : ""; } catch (e) {}
  if (referrer === location.hostname) referrer = "";
  let visit = {};
  try { visit = JSON.parse(sessionStorage.getItem("visit") || "{}"); } catch (e) {}
  const fresh = params.get("ref") || params.get("utm_source");
  if (fresh || !visit.source) {
    visit = {
      source: fresh || referrer || "direct",
      medium: params.get("utm_medium") || "",
      campaign: params.get("utm_campaign") || "",
      referrer,
    };
    try { sessionStorage.setItem("visit", JSON.stringify(visit)); } catch (e) {}
  }
  const device = window.matchMedia && matchMedia("(pointer: coarse)").matches ? "mobile" : "desktop";
  const page = location.pathname.replace(/\/index\.html$/, "/") || "/";

  // --- Sending ----------------------------------------------------------------
  const dbReady = Boolean(db.url && db.publishableKey);
  function insert(table, row) {
    if (!dbReady) {
      console.info(`[spark] Supabase is not connected yet — ${table} row:`, row);
      return Promise.resolve({ ok: false, reason: "not-connected" });
    }
    const headers = {
      "Content-Type": "application/json",
      apikey: db.publishableKey,
      Prefer: "return=minimal",
    };
    // Legacy anon keys are JWTs and also go in the Authorization header.
    if (db.publishableKey.startsWith("eyJ")) headers.Authorization = "Bearer " + db.publishableKey;
    return fetch(db.url.replace(/\/$/, "") + "/rest/v1/" + table, {
      method: "POST",
      headers,
      body: JSON.stringify(row),
      keepalive: true,
    })
      .then(async (res) => ({ ok: res.ok, reason: res.ok ? "" : await res.text() }))
      .catch((err) => ({ ok: false, reason: String(err) }));
  }

  // track("event_name", {optional: "detail"}) — the standard events below use
  // it, and so can any page for its own: lowercase letters and underscores.
  function track(type, detail) {
    if (!/^[a-z][a-z_]{1,39}$/.test(type)) return console.warn("[spark] event name refused:", type);
    return insert("events", {
      type, page, visitor_id: visitorId, session_id: sessionId,
      source: visit.source, medium: visit.medium, campaign: visit.campaign,
      referrer: visit.referrer, device, detail: detail || null,
    });
  }
  window.track = track;

  // 1. page_view — every page load.
  track("page_view");

  // 2. engaged — once per page load: half the page scrolled, or 15 seconds
  //    with the page in view.
  let engaged = false, seen = 0, last = Date.now();
  function markEngaged(how) {
    if (engaged) return;
    engaged = true;
    track("engaged", { how });
  }
  window.addEventListener("scroll", () => {
    const h = document.documentElement.scrollHeight - innerHeight;
    if (h > 0 && scrollY / h >= 0.5) markEngaged("scroll");
  }, { passive: true });
  const timer = setInterval(() => {
    const now = Date.now();
    if (document.visibilityState === "visible") seen += now - last;
    last = now;
    if (seen >= 15000) { clearInterval(timer); markEngaged("time"); }
  }, 1000);

  // 3. cta_click — the ask buttons: any element with data-ask. Where they
  //    lead depends on the ask type in config.js.
  const askBox = document.getElementById("ask-instructions");
  const manual = ask.type === "payment" && ask.provider === "manual";
  function withVisitor(link) {
    // Stripe payment links carry the visitor id back on the payment, so a
    // deposit can be traced to the visit and channel that brought it.
    try {
      const u = new URL(link);
      if (/(^|\.)stripe\.com$/.test(u.hostname)) u.searchParams.set("client_reference_id", visitorId);
      return u.toString();
    } catch (e) { return link; }
  }
  document.querySelectorAll("[data-ask]").forEach((btn, i) => {
    if (ask.type === "signup") {
      btn.setAttribute("href", "#list");
    } else if (manual) {
      btn.setAttribute("href", "#ask-instructions");
    } else if (ask.link) {
      btn.setAttribute("href", withVisitor(ask.link));
    } else {
      btn.setAttribute("href", "#deal");
      btn.dataset.pending = "true";
    }
    btn.addEventListener("click", () => {
      track("cta_click", { ask: ask.type || "", position: i + 1 });
      if (manual && askBox) {
        askBox.hidden = false;
        const text = askBox.querySelector("[data-ask-text]");
        if (text) text.textContent = ask.instructions || "Details coming shortly.";
      }
      if (ask.type === "signup") {
        const first = document.querySelector("#lead-form input[name=name]");
        if (first) setTimeout(() => first.focus(), 300);
      }
    });
  });

  // 4. lead — the list form.
  const form = document.getElementById("lead-form");
  if (form) {
    const status = form.querySelector("[data-status]");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      if (data.get("website")) { // honeypot: people leave it empty, bots fill it
        form.reset();
        status.textContent = "Thanks — you're on the list.";
        return;
      }
      const row = {
        name: String(data.get("name") || "").trim().slice(0, 120),
        email: String(data.get("email") || "").trim().slice(0, 254),
        note: String(data.get("note") || "").trim().slice(0, 1000),
        source: visit.source,
        page,
        visitor_id: visitorId,
      };
      const button = form.querySelector("button[type=submit]");
      button.disabled = true;
      status.textContent = "Sending…";
      const result = await insert("leads", row);
      button.disabled = false;
      if (result.ok) {
        track("lead");
        form.reset();
        status.textContent = "Thanks — you're on the list.";
      } else if (result.reason === "not-connected") {
        status.textContent = "Preview mode: connect Supabase in site/config.js to save this.";
      } else {
        console.warn("[spark] lead not saved:", result.reason);
        status.textContent = "That didn't go through. Please try again, or email us.";
      }
    });
  }

  // 5. confirmed — a paid deposit, a call held, a form signed — is recorded
  //    outside the page: /log in evidence/commitments.csv, or a webhook into
  //    the commitments table at Level 2.
})();

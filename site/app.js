// Wires the page to config.js: deposit buttons, the lead form, and the
// funnel events (page views and deposit clicks) that land in Supabase.

(function () {
  const cfg = window.SITE_CONFIG || {};
  const pay = cfg.payments || {};
  const db = cfg.supabase || {};

  // Where did this visitor come from? ?utm_source=… or ?ref=… on any link
  // you post. Kept for the visit so every event carries it.
  const params = new URLSearchParams(location.search);
  let source = params.get("utm_source") || params.get("ref") || "";
  try {
    if (source) sessionStorage.setItem("visit_source", source);
    else source = sessionStorage.getItem("visit_source") || "";
  } catch (e) {}
  if (!source && document.referrer) {
    try { source = new URL(document.referrer).hostname; } catch (e) {}
  }

  const page = location.pathname.replace(/\/index\.html$/, "/") || "/";
  const dbReady = Boolean(db.url && db.publishableKey);

  function insert(table, row) {
    if (!dbReady) {
      console.info(`[site] Supabase is not connected yet — ${table} row:`, row);
      return Promise.resolve({ ok: false, reason: "not-connected" });
    }
    const headers = {
      "Content-Type": "application/json",
      apikey: db.publishableKey,
      Prefer: "return=minimal",
    };
    // Legacy anon keys are JWTs and also go in the Authorization header.
    if (db.publishableKey.startsWith("eyJ")) {
      headers.Authorization = "Bearer " + db.publishableKey;
    }
    return fetch(db.url.replace(/\/$/, "") + "/rest/v1/" + table, {
      method: "POST",
      headers,
      body: JSON.stringify(row),
      keepalive: true,
    })
      .then(async (res) => ({ ok: res.ok, reason: res.ok ? "" : await res.text() }))
      .catch((err) => ({ ok: false, reason: String(err) }));
  }

  insert("events", { type: "view", page, source });

  // Deposit buttons: any element with data-deposit.
  const manualBox = document.getElementById("manual-payment");
  document.querySelectorAll("[data-deposit]").forEach((btn) => {
    if (pay.provider === "manual") {
      btn.setAttribute("href", "#manual-payment");
    } else if (pay.depositLink) {
      btn.setAttribute("href", pay.depositLink);
    } else {
      btn.setAttribute("href", "#deposit");
      btn.dataset.pending = "true";
    }
    btn.addEventListener("click", () => {
      insert("events", { type: "deposit_click", page, source });
      if (pay.provider === "manual" && manualBox) {
        manualBox.hidden = false;
        const text = manualBox.querySelector("[data-manual-text]");
        if (text) text.textContent = pay.manualInstructions || "Payment details coming shortly.";
      }
    });
  });

  // Lead form.
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
        source,
        page,
      };
      const button = form.querySelector("button[type=submit]");
      button.disabled = true;
      status.textContent = "Sending…";
      const result = await insert("leads", row);
      button.disabled = false;
      if (result.ok) {
        form.reset();
        status.textContent = "Thanks — you're on the list.";
      } else if (result.reason === "not-connected") {
        status.textContent = "Preview mode: connect Supabase in site/config.js to save this.";
      } else {
        console.warn("[site] lead not saved:", result.reason);
        status.textContent = "That didn't go through. Please try again, or email us.";
      }
    });
  }
})();

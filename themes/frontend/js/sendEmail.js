// ====== Elems ======
const mainForm = document.getElementById("mainForm");
const formTypeSelect = document.getElementById("formType");
const customerFields = document.getElementById("customerFields");
const partnerFields = document.getElementById("partnerFields");
const communityFields = document.getElementById("communityFields");

// ====================== MODAL (középre igazított felugró) ======================
(() => {
  const css = `
  .ac-modal-backdrop {
    position: fixed; inset: 0; background: rgba(0,0,0,.45);
    display: none; align-items: center; justify-content: center;
    z-index: 9999; backdrop-filter: blur(2px);
  }
  .ac-modal-backdrop.show { display: flex; }
  .ac-modal {
    width: min(560px, 92vw);
    background: #fff; color: #222; border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,.25);
    transform: translateY(12px) scale(.98); opacity: 0;
    transition: transform .22s ease, opacity .22s ease;
    overflow: hidden;
  }
  .ac-modal.open { transform: translateY(0) scale(1); opacity: 1; }
  .ac-modal-header {
    display: flex; align-items: center; gap: 10px;
    padding: 16px 20px; border-bottom: 1px solid #f0f0f0;
  }
  .ac-modal-title { font-size: 18px; font-weight: 700; margin: 0; flex: 1; }
  .ac-modal-close {
    border: none; background: transparent; cursor: pointer;
    font-size: 20px; line-height: 1; padding: 6px; border-radius: 8px;
  }
  .ac-modal-close:hover { background: #f5f5f5; }
  .ac-modal-body { padding: 20px; font-size: 15px; line-height: 1.6; }
  .ac-modal-actions {
    display: flex; gap: 10px; justify-content: flex-end; padding: 16px 20px; border-top: 1px solid #f0f0f0;
  }
  .ac-btn {
    appearance: none; border: 1px solid #ddd; background: #fff; color: #222;
    padding: 10px 14px; border-radius: 10px; cursor: pointer; font-weight: 600;
  }
  .ac-btn:hover { background: #f7f7f7; }
  .ac-btn-primary {
    background: #0ea5e9; border-color: #0ea5e9; color: #fff;
  }
  .ac-btn-primary:hover { filter: brightness(0.95); }
  /* Típusok (success, warning, error, info) */
  .ac-modal--success .ac-modal-header { background: #ecfdf5; }
  .ac-modal--warning .ac-modal-header { background: #fff7ed; }
  .ac-modal--error   .ac-modal-header { background: #fef2f2; }
  .ac-modal--info    .ac-modal-header { background: #eff6ff; }
  `;
  const style = document.createElement("style");
  style.innerHTML = css;
  document.head.appendChild(style);

  const backdrop = document.createElement("div");
  backdrop.className = "ac-modal-backdrop";
  backdrop.innerHTML = `
    <div class="ac-modal" role="dialog" aria-modal="true" aria-labelledby="ac-modal-title">
      <div class="ac-modal-header">
        <h3 id="ac-modal-title" class="ac-modal-title">Message</h3>
        <button class="ac-modal-close" aria-label="Close">&times;</button>
      </div>
      <div class="ac-modal-body"></div>
      <div class="ac-modal-actions">
        <button class="ac-btn" data-ac-secondary>Close</button>
        <button class="ac-btn ac-btn-primary" data-ac-primary>OK</button>
      </div>
    </div>
  `;
  document.body.appendChild(backdrop);

  const modal = backdrop.querySelector(".ac-modal");
  const titleEl = backdrop.querySelector(".ac-modal-title");
  const bodyEl = backdrop.querySelector(".ac-modal-body");
  const btnPrimary = backdrop.querySelector("[data-ac-primary]");
  const btnSecondary = backdrop.querySelector("[data-ac-secondary]");
  const btnCloseX = backdrop.querySelector(".ac-modal-close");

  let lastFocus = null;
  let onResolve = null;

  function trapFocus(e) {
    if (!backdrop.classList.contains("show")) return;
    const focusables = backdrop.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const list = Array.from(focusables).filter(
      (el) => !el.disabled && el.offsetParent !== null
    );
    if (list.length === 0) return;
    const first = list[0];
    const last = list[list.length - 1];
    if (e.key === "Tab") {
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    } else if (e.key === "Escape") {
      closeModal();
    }
  }

  function openModal({
    title = "Message",
    html = "",
    type = "info", // 'success' | 'warning' | 'error' | 'info'
    primaryText = "OK",
    secondaryText = "Close",
    onPrimary = null,
    onSecondary = null,
    autoCloseMs = null,
  } = {}) {
    lastFocus = document.activeElement;
    backdrop.classList.add("show");
    modal.classList.add("open");
    modal.classList.remove(
      "ac-modal--success",
      "ac-modal--warning",
      "ac-modal--error",
      "ac-modal--info"
    );
    modal.classList.add(`ac-modal--${type}`);

    titleEl.textContent = title;
    bodyEl.innerHTML = html;

    btnPrimary.textContent = primaryText;
    btnSecondary.textContent = secondaryText;

    onResolve = (which) => {
      if (which === "primary" && typeof onPrimary === "function") onPrimary();
      if (which === "secondary" && typeof onSecondary === "function")
        onSecondary();
    };

    document.addEventListener("keydown", trapFocus);
    setTimeout(() => btnPrimary.focus(), 10);

    if (autoCloseMs && Number.isFinite(autoCloseMs)) {
      setTimeout(() => closeModal(), autoCloseMs);
    }
  }

  function closeModal(which = null) {
    modal.classList.remove("open");
    setTimeout(() => {
      backdrop.classList.remove("show");
      if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    }, 180);
    document.removeEventListener("keydown", trapFocus);
    if (onResolve) onResolve(which);
    onResolve = null;
  }

  // Kattintáskezelők
  btnPrimary.addEventListener("click", () => closeModal("primary"));
  btnSecondary.addEventListener("click", () => closeModal("secondary"));
  btnCloseX.addEventListener("click", () => closeModal("secondary"));
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeModal("secondary");
  });

  // Globális elérés
  window.openModal = (opts) => openModal(opts);
  window.closeModal = () => closeModal();
})();

// Gyors helper a korábbi alert-ek kiváltására
function showModal(
  text,
  type = "info",
  titleMap = {
    info: "Information",
    success: "Success",
    warning: "Attention",
    error: "Error",
  }
) {
  window.openModal({
    title: titleMap[type] || "Message",
    html: `<p>${text}</p>`,
    type,
    primaryText: "OK",
    secondaryText: "Close",
  });
}

// ====================== /MODAL ======================

// ====== Helper ======
function getEl(...ids) {
  for (const id of ids) {
    const el = document.getElementById(id);
    if (el) return el;
  }
  return null;
}

function toggleSection(container, show) {
  if (!container) return;
  container.style.display = show ? "block" : "none";
  const fields = container.querySelectorAll("input, textarea, select");
  fields.forEach((el) => (el.disabled = !show));
}

function hideAllSections() {
  toggleSection(customerFields, false);
  toggleSection(partnerFields, false);
  toggleSection(communityFields, false);
}

function showOnly(type) {
  hideAllSections();
  if (type === "customer") toggleSection(customerFields, true);
  if (type === "partner") toggleSection(partnerFields, true);
  if (type === "community") toggleSection(communityFields, true);
}

// ====== Kezdeti állapot ======
(function init() {
  hideAllSections();
  const selectedType = formTypeSelect.value;
  if (["customer", "partner", "community"].includes(selectedType)) {
    showOnly(selectedType);
  }
})();

// ====== Típus váltás ======
formTypeSelect.addEventListener("change", function () {
  const selectedType = this.value;
  showOnly(selectedType);
});

// ====== Submit kezelés ======
mainForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formType = formTypeSelect.value;
  const gdprCheckbox = document.getElementById("gdpr");

  if (!formType) {
    showModal(
      "Please select a category (Customer, Partner, or Community)!",
      "warning"
    );
    return;
  }

  if (!gdprCheckbox?.checked) {
    showModal("Please accept the privacy policy!", "warning");
    return;
  }

  const formData = {
    formType,
    name: getEl("name")?.value?.trim() || "",
    email: getEl("email")?.value?.trim() || "",
    phone: getEl("phone")?.value?.trim() || "",
    marketing: !!getEl("marketing")?.checked,
  };

  // ===== CUSTOMER =====
  if (formType === "customer") {

    formData.ideal_location = getEl("ideal_location")?.value || "";
    formData.count = getEl("count")?.value || "";

    const services = [];
    document
      .querySelectorAll('input[name="customer_services"]:checked')
      .forEach((cb) => services.push(cb.value));
    formData.services = services;


  }

  // ===== PARTNER =====
  if (formType === "partner") {
    formData.company_name = getEl("company_name")?.value?.trim() || "";
    formData.office_locations = getEl("office_locations")?.value?.trim() || "";
    formData.business_service = getEl("business_service")?.value?.trim() || "";
    formData.why_select = getEl("why_select")?.value?.trim() || "";
    formData.benefit = getEl("benefit")?.value?.trim() || "";

    if (
      !formData.company_name ||
      !formData.office_locations ||
      !formData.business_service ||
      !formData.why_select ||
      !formData.benefit
    ) {
      showModal("Please fill in all required fields!", "warning");
      return;
    }
  }

  // ===== COMMUNITY =====
  if (formType === "community") {
    formData.community_name = getEl("community_name")?.value?.trim() || "";
    formData.president_name = getEl("president_name")?.value?.trim() || "";
    formData.location = getEl("location")?.value?.trim() || "";
    formData.units = getEl("units")?.value || "";
    formData.new_community = !!getEl("new_community")?.checked;
    formData.established_community = !!getEl("established_community")?.checked;

    const services = [];
    document
      .querySelectorAll('input[name="community_services"]:checked')
      .forEach((cb) => services.push(cb.value));
    formData.services = services;

    if (!formData.community_name || !formData.location || !formData.units) {
      showModal("Please fill in all required fields!", "warning");
      return;
    }
    if (!formData.new_community && !formData.established_community) {
      showModal("Please select at least one community status!", "warning");
      return;
    }
  }

  // ===== API hívás =====
  try {
    const response = await fetch(
      "https://email-api-wheat.vercel.app/send-email-allincosta",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      window.openModal({
        title: "Success",
        type: "success",
        html: `<p>Dear <strong>${formData.name || "Customer"}</strong>!<br>
        Thank you for contacting us! We have received your message and will get back to you soon.</p>`,
        primaryText: "Great",
        secondaryText: "Close",
        autoCloseMs: 6000,
      });
      mainForm.reset();
      hideAllSections();
    } else {
      const error = await response.json().catch(() => ({}));
      console.error("Error occurred:", error);
      showModal("An error occurred while sending. Please try again!", "error");
    }
  } catch (err) {
    console.error("Request error:", err);
    showModal(
      "A network error occurred. Please check your internet connection and try again.",
      "error"
    );
  }
});

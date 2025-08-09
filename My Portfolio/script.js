document.addEventListener("DOMContentLoaded", function () {

  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll('[data-nav]').forEach(a => {
    if (a.getAttribute('data-nav') === current) a.classList.add('active');
  });

  
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") body.setAttribute("data-theme", "dark");
  const updateToggleState = () => {
    const isDark = body.getAttribute("data-theme") === "dark";
    if (themeToggle){
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.textContent = isDark ? "☀️" : "🌙";
    }
  };
  updateToggleState();
  themeToggle && themeToggle.addEventListener("click", () => {
    const isDark = body.getAttribute("data-theme") === "dark";
    if (isDark){ body.removeAttribute("data-theme"); localStorage.setItem("theme","light"); }
    else { body.setAttribute("data-theme","dark"); localStorage.setItem("theme","dark"); }
    updateToggleState();
  });

  
  const scrollBtn = document.getElementById("scrollTop");
  const onScroll = () => {
    if (!scrollBtn) return;
    if (window.scrollY > 200) scrollBtn.classList.add("show");
    else scrollBtn.classList.remove("show");
  };
  window.addEventListener("scroll", onScroll);
  scrollBtn && scrollBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));
  onScroll();

  
  const form = document.getElementById("contactForm");
  const success = document.getElementById("formMessage");
  if (form){
    const fields = {
      name: document.getElementById("name"),
      email: document.getElementById("email"),
      subject: document.getElementById("subject"),
      message: document.getElementById("message"),
    };
    const errors = {
      name: document.getElementById("nameError"),
      email: document.getElementById("emailError"),
      subject: document.getElementById("subjectError"),
      message: document.getElementById("messageError"),
    };

    const validators = {
      name: v => v.trim().length >= 2 || "Enter at least 2 characters.",
      email: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Enter a valid email address.",
      subject: v => v.trim().length >= 3 || "Enter a subject (3+ chars).",
      message: v => v.trim().length >= 10 || "Message should be 10+ characters.",
    };

    const validateField = (key) => {
      const input = fields[key];
      const value = input.value;
      const result = validators[key](value);
      if (result !== true){
        input.classList.add('error');
        errors[key].textContent = result;
        return false;
      } else {
        input.classList.remove('error');
        errors[key].textContent = "";
        return true;
      }
    };

    

    Object.keys(fields).forEach(key => {
      fields[key].addEventListener('input', () => validateField(key));
      fields[key].addEventListener('blur', () => validateField(key));
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const ok = Object.keys(fields).map(validateField).every(Boolean);
      if (!ok) return;

      form.reset();
      Object.values(errors).forEach(el => el.textContent = "");
      Object.values(fields).forEach(el => el.classList.remove('error'));

      success.textContent = "Thank you! Your message has been sent successfully.";
    });
  }
});

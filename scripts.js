document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  setupNav();
  setupReveal();
  setupLightbox();
  setupCopyEmail();
  document.querySelector(".year").textContent = new Date().getFullYear();
});

function setupTheme() {
  const root = document.documentElement;
  const button = document.querySelector(".theme-toggle");

  button.addEventListener("click", () => {
    const current =
      root.dataset.theme ||
      (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const next = current === "light" ? "dark" : "light";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch (e) {}
  });
}

function setupNav() {
  const nav = document.querySelector(".nav");
  const links = document.querySelectorAll(".nav-links a");

  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) =>
          link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${entry.target.id}`,
          ),
        );
      });
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );

  document.querySelectorAll("section[id]").forEach((s) => observer.observe(s));
}

function setupReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  items.forEach((el) => observer.observe(el));
}

function setupLightbox() {
  const dialog = document.querySelector(".lightbox");
  const image = dialog.querySelector("img");
  const title = dialog.querySelector(".lightbox-title");

  document.querySelectorAll(".cert-thumb").forEach((thumb) => {
    thumb.addEventListener("click", () => {
      image.src = thumb.dataset.src;
      image.alt = thumb.dataset.title;
      title.textContent = thumb.dataset.title;
      dialog.showModal();
    });
  });

  dialog
    .querySelector(".lightbox-close")
    .addEventListener("click", () => dialog.close());

  // Fecha ao clicar fora da imagem
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) dialog.close();
  });
}

function setupCopyEmail() {
  const button = document.querySelector(".copy-email");
  const label = button.querySelector("span");
  const email = label.textContent;

  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      label.textContent = "E-mail copiado!";
    } catch (e) {
      window.location.href = `mailto:${email}`;
      return;
    }
    setTimeout(() => (label.textContent = email), 2000);
  });
}

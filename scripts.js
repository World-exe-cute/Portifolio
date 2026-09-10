/*document.addEventListener("DOMContentLoaded", () => {
  const profileContainer = document.querySelector(".profile-title");
  const navContainer = document.querySelector("nav");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        navContainer.classList.add("show");
      } else {
        navContainer.classList.remove("show");
      }
      console.log("IH");
    });
  });

  observer.observe(profileContainer);
});*/

function showCertificate(e) {
  setTimeout(() => {
    console.log(e);
    const father = e.parentElement;
    father.classList.add("active");
  }, 10);
}

function removeEvent(e) {
  console.log("ola");
  const active = e.querySelector(".active");
  if (active) {
    active.classList.remove("active");
  }
}

function rollTop() {
  window.scrollTo(0, 0);
}

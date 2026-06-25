/* Pillzar — interactions: mobile nav, scroll reveal, lazy YouTube facades */
(function () {
  "use strict";

  /* ---- Mobile navigation ---- */
  var toggle = document.querySelector(".nav-toggle");
  var mobileNav = document.getElementById("mobile-nav");
  if (toggle && mobileNav) {
    toggle.addEventListener("click", function () {
      var open = mobileNav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    mobileNav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        mobileNav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---- YouTube facade: load iframe only on demand ---- */
  function loadVideo(facade) {
    var id = facade.getAttribute("data-yt");
    if (!id || facade.querySelector("iframe")) return;
    var iframe = document.createElement("iframe");
    iframe.setAttribute("src",
      "https://www.youtube-nocookie.com/embed/" + id +
      "?autoplay=1&rel=0&modestbranding=1");
    iframe.setAttribute("title", facade.getAttribute("data-title") || "Pillzar video");
    iframe.setAttribute("allow",
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
    iframe.setAttribute("allowfullscreen", "");
    facade.appendChild(iframe);
  }

  document.querySelectorAll(".yt-facade").forEach(function (facade) {
    var id = facade.getAttribute("data-yt");
    if (id) {
      // Lightweight thumbnail (no JS-blocking, no cookies until play)
      facade.style.backgroundImage =
        "url('https://i.ytimg.com/vi/" + id + "/hqdefault.jpg')";
    }
    facade.addEventListener("click", function () { loadVideo(facade); });
    facade.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        loadVideo(facade);
      }
    });
  });

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(
    ".product-card, .feature-card, .step, .video, .souvenir-copy, .souvenir-visual, .section-head"
  );
  revealEls.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Year in footer (keeps copyright fresh) ---- */
  var yr = new Date().getFullYear();
  document.querySelectorAll(".js-year").forEach(function (n) { n.textContent = yr; });
})();

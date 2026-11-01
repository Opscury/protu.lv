/* Protu lapas: the only script on published sites. No framework, no inline JS.
   1. full-screen image viewer (arrows, swipe, Esc, counter, click/pinch zoom)
   2. embeds load only after a click (no third-party requests on page load)
   3. the contact form posts with fetch and shows a thank-you            */
(function () {
  "use strict";

  /* 1. viewer */
  var links = Array.prototype.slice.call(document.querySelectorAll("a.viewer-link"));
  var viewer = document.getElementById("viewer");
  var index = 0, img, counter, caption, lastFocus, startX = null;

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function build() {
    viewer.textContent = "";
    var stage = el("div", "viewer-stage");
    img = el("img");
    img.alt = "";
    stage.appendChild(img);
    counter = el("p", "v-counter");
    caption = el("p", "v-caption");
    var close = el("button", "v-close", "×");
    var prev = el("button", "v-prev", "‹");
    var next = el("button", "v-next", "›");
    close.type = prev.type = next.type = "button";
    close.setAttribute("aria-label", viewer.dataset.close);
    prev.setAttribute("aria-label", viewer.dataset.prev);
    next.setAttribute("aria-label", viewer.dataset.next);
    close.addEventListener("click", hide);
    prev.addEventListener("click", function () { show(index - 1); });
    next.addEventListener("click", function () { show(index + 1); });
    img.addEventListener("click", function () { viewer.classList.toggle("zoomed"); });
    stage.addEventListener("touchstart", function (e) {
      startX = e.touches.length === 1 ? e.touches[0].clientX : null;
    }, { passive: true });
    stage.addEventListener("touchend", function (e) {
      if (startX === null || viewer.classList.contains("zoomed")) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
      startX = null;
    });
    viewer.appendChild(stage);
    viewer.appendChild(counter);
    viewer.appendChild(caption);
    viewer.appendChild(close);
    if (links.length > 1) { viewer.appendChild(prev); viewer.appendChild(next); }
  }

  function show(i) {
    index = (i + links.length) % links.length;
    var a = links[index];
    viewer.classList.remove("zoomed");
    img.src = a.getAttribute("href");
    img.width = +a.dataset.w || 0;
    img.height = +a.dataset.h || 0;
    var inner = a.querySelector("img");
    img.alt = inner ? inner.alt : "";
    counter.textContent = (index + 1) + " " + viewer.dataset.of + " " + links.length;
    caption.textContent = a.dataset.caption || "";
  }

  function open(i) {
    if (!viewer.firstChild) build();
    lastFocus = document.activeElement;
    viewer.hidden = false;
    document.body.classList.add("viewer-open");
    show(i);
    viewer.querySelector(".v-close").focus();
  }

  function hide() {
    viewer.hidden = true;
    document.body.classList.remove("viewer-open");
    if (lastFocus) lastFocus.focus();
  }

  if (viewer && links.length) {
    links.forEach(function (a, i) {
      a.addEventListener("click", function (e) {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        open(i);
      });
    });
    document.addEventListener("keydown", function (e) {
      if (viewer.hidden) return;
      if (e.key === "Escape") hide();
      else if (e.key === "ArrowRight") show(index + 1);
      else if (e.key === "ArrowLeft") show(index - 1);
    });
  }

  /* 2. click-to-load embeds. The URL was built by the server from an allow-listed provider + id. */
  var allowed = /^https:\/\/(www\.youtube-nocookie\.com\/embed\/|player\.vimeo\.com\/video\/|w\.soundcloud\.com\/player\/|bandcamp\.com\/EmbeddedPlayer\/)/;
  Array.prototype.forEach.call(document.querySelectorAll("button.embed-play"), function (btn) {
    btn.addEventListener("click", function () {
      var src = btn.dataset.embed;
      if (!allowed.test(src)) return;
      var frame = document.createElement("iframe");
      frame.src = src;
      frame.title = btn.getAttribute("aria-label") || "";
      frame.allow = "autoplay; fullscreen; picture-in-picture; encrypted-media";
      frame.setAttribute("allowfullscreen", "");
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      btn.replaceWith(frame);
    });
  });

  /* 3. contact form */
  Array.prototype.forEach.call(document.querySelectorAll("form.contact-form"), function (form) {
    form.addEventListener("submit", function (e) {
      if (!window.fetch || !window.FormData) return;
      e.preventDefault();
      var status = form.querySelector(".form-status");
      var button = form.querySelector("button[type=submit]");
      button.disabled = true;
      fetch(form.action, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } })
        .then(function (r) {
          if (!r.ok) throw new Error(String(r.status));
          status.textContent = form.dataset.thanks;
          form.reset();
        })
        .catch(function () { status.textContent = form.dataset.error; })
        .then(function () { button.disabled = false; });
    });
  });
})();

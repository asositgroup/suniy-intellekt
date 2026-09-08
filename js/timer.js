(function () {
  "use strict";
  var VARIANT = document.body.dataset.variant || "1";
  var STORE_KEY = "zapusk_deadline_v" + VARIANT;
  var MINUTES = 2;

  function deadline() {
    var saved = Number(localStorage.getItem(STORE_KEY));
    var now = Date.now();
    if (!saved || saved <= now) {
      saved = now + MINUTES * 60000;
      try {
        localStorage.setItem(STORE_KEY, String(saved));
      } catch (e) {}
    }
    return saved;
  }

  function pad(n) {
    return n < 10 ? "0" + n : String(n);
  }

  function tick(nodes, end) {
    var left = Math.max(0, end - Date.now());
    var total = Math.floor(left / 1000);
    var h = Math.floor(total / 3600);
    var m = Math.floor((total % 3600) / 60);
    var s = total % 60;
    nodes.forEach(function (el) {
      if (el.dataset.timer === "hms") {
        var slots = el.querySelectorAll("[data-slot]");
        if (slots.length === 3) {
          slots[0].textContent = pad(h);
          slots[1].textContent = pad(m);
          slots[2].textContent = pad(s);
        } else {
          el.textContent = pad(h) + ":" + pad(m) + ":" + pad(s);
        }
      } else {
        el.textContent = pad(h * 60 + m) + ":" + pad(s);
      }
    });
    if (left <= 0) {
      localStorage.removeItem(STORE_KEY);
      startTimer();
    }
  }

  var timerId = null;
  function startTimer() {
    var nodes = [].slice.call(document.querySelectorAll("[data-timer]"));
    if (!nodes.length) return;
    var end = deadline();
    clearInterval(timerId);
    tick(nodes, end);
    timerId = setInterval(function () {
      tick(nodes, end);
    }, 1000);
  }
  startTimer();
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) startTimer();
  });
})();

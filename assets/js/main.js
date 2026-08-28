/* Midnight Shift — site behaviour (no dependencies) */
(function () {
  "use strict";

  var DEMO_EMAIL = "admin@midnightshift.sg";
  var CRLF = String.fromCharCode(13, 10); // mail clients expect CRLF in the body

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector(".site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        document.body.style.overflow = "";
      }
    });
  }

  /* ---------- Sticky mobile CTA ---------- */
  var stickyCta = document.querySelector(".sticky-cta");
  if (stickyCta) {
    var shown = false;
    var onScroll = function () {
      var shouldShow = window.scrollY > 520;
      if (shouldShow !== shown) {
        shown = shouldShow;
        stickyCta.classList.toggle("is-visible", shouldShow);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Reveal on scroll ---------- */
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) { io.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-in"); });
  }

  /* ---------- Footer year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* ---------- Time calculator ---------- */
  var calc = document.querySelector("[data-calc]");
  if (calc) {
    var leads = calc.querySelector("#calc-leads");
    var attempts = calc.querySelector("#calc-attempts");
    var minutes = calc.querySelector("#calc-minutes");
    var outLeads = calc.querySelector("#calc-leads-out");
    var outAttempts = calc.querySelector("#calc-attempts-out");
    var outMinutes = calc.querySelector("#calc-minutes-out");
    var resultHours = calc.querySelector("#calc-hours");
    var resultDays = calc.querySelector("#calc-days");

    var update = function () {
      var l = Number(leads.value);
      var a = Number(attempts.value);
      var m = Number(minutes.value);
      outLeads.textContent = String(l);
      outAttempts.textContent = String(a);
      outMinutes.textContent = m + " min";
      // Dial attempts + logging/admin overhead (~40%).
      var totalMinutes = l * a * m * 1.4;
      var hours = totalMinutes / 60;
      var rounded = hours >= 20 ? Math.round(hours) : Math.round(hours * 2) / 2;
      resultHours.textContent = String(rounded);
      var workdays = hours / 8;
      resultDays.textContent =
        workdays >= 1
          ? "That is roughly " + (Math.round(workdays * 10) / 10) + " full working days every month spent dialing and logging — before a single appointment happens."
          : "Even a few hours a week adds up — and it is the first thing dropped on a busy week.";
    };
    [leads, attempts, minutes].forEach(function (input) {
      input.addEventListener("input", update);
    });
    update();
  }

  /* ---------- Demo form ---------- */
  var form = document.querySelector("[data-demo-form]");
  if (form) {
    var setError = function (name, hasError) {
      var field = form.querySelector('[data-field="' + name + '"]');
      if (field) field.classList.toggle("has-error", hasError);
      return hasError;
    };
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var get = function (name) {
        var el = form.elements[name];
        return el ? el.value.trim() : "";
      };
      var name = get("name");
      var mobile = get("mobile");
      var role = get("role");
      var volume = get("volume");
      var sources = get("sources");
      var message = get("message");

      var invalid = false;
      invalid = setError("name", name.length < 2) || invalid;
      invalid = setError("mobile", !/^[+\d][\d\s-]{7,}$/.test(mobile)) || invalid;
      invalid = setError("role", role === "") || invalid;
      if (invalid) {
        var firstError = form.querySelector(".has-error input, .has-error select");
        if (firstError) firstError.focus();
        return;
      }

      var lines = [
        "Hi Midnight Shift, I'd like to book a demo.",
        "",
        "Name: " + name,
        "Mobile: " + mobile,
        "I am a/an: " + role
      ];
      if (volume) lines.push("Leads per month: " + volume);
      if (sources) lines.push("Main lead sources: " + sources);
      if (message) lines.push("Notes: " + message);

      var url =
        "mailto:" + DEMO_EMAIL +
        "?subject=" + encodeURIComponent("Demo request — " + name) +
        "&body=" + encodeURIComponent(lines.join(CRLF));
      // mailto opens more reliably via location than window.open, which can strand a blank tab.
      window.location.href = url;

      var success = form.parentElement.querySelector(".form-success");
      if (success) {
        success.classList.add("is-visible");
        success.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }
})();

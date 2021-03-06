"use strict";
function polyfill() {
  function o(o) {
    var t = ["MSIE ", "Trident/", "Edge/"];
    return new RegExp(t.join("|")).test(o);
  }
  function t(o, t) {
    (this.scrollLeft = o), (this.scrollTop = t);
  }
  function e(o) {
    return 0.5 * (1 - Math.cos(Math.PI * o));
  }
  function l(o) {
    if (
      null === o ||
      "object" != typeof o ||
      void 0 === o.behavior ||
      "auto" === o.behavior ||
      "instant" === o.behavior
    )
      return !0;
    if ("object" == typeof o && "smooth" === o.behavior) return !1;
    throw new TypeError(
      "behavior member of ScrollOptions " +
        o.behavior +
        " is not a valid value for enumeration ScrollBehavior."
    );
  }
  function r(o, t) {
    return "Y" === t
      ? o.clientHeight + b < o.scrollHeight
      : "X" === t
      ? o.clientWidth + b < o.scrollWidth
      : void 0;
  }
  function i(o, t) {
    var e = u.getComputedStyle(o, null)["overflow" + t];
    return "auto" === e || "scroll" === e;
  }
  function n(o) {
    var t = r(o, "Y") && i(o, "Y"),
      e = r(o, "X") && i(o, "X");
    return t || e;
  }
  function c(o) {
    for (; o !== m.body && !1 === n(o); ) o = o.parentNode || o.host;
    return o;
  }
  function s(o) {
    var t,
      l,
      r,
      i = y(),
      n = (i - o.startTime) / h;
    (n = n > 1 ? 1 : n),
      (t = e(n)),
      (l = o.startX + (o.x - o.startX) * t),
      (r = o.startY + (o.y - o.startY) * t),
      o.method.call(o.scrollable, l, r),
      (l === o.x && r === o.y) || u.requestAnimationFrame(s.bind(u, o));
  }
  function a(o, e, l) {
    var r,
      i,
      n,
      c,
      a = y();
    o === m.body
      ? ((r = u),
        (i = u.scrollX || u.pageXOffset),
        (n = u.scrollY || u.pageYOffset),
        (c = w.scroll))
      : ((r = o), (i = o.scrollLeft), (n = o.scrollTop), (c = t)),
      s({
        scrollable: r,
        method: c,
        startTime: a,
        startX: i,
        startY: n,
        x: e,
        y: l,
      });
  }
  for (
    var f = 0, p = ["ms", "moz", "webkit", "o"], d = 0;
    d < p.length && !window.requestAnimationFrame;
    ++d
  )
    (window.requestAnimationFrame = window[p[d] + "RequestAnimationFrame"]),
      (window.cancelAnimationFrame =
        window[p[d] + "CancelAnimationFrame"] ||
        window[p[d] + "CancelRequestAnimationFrame"]);
  window.requestAnimationFrame ||
    (window.requestAnimationFrame = function (o, t) {
      var e = new Date().getTime(),
        l = Math.max(0, 16 - (e - f)),
        r = window.setTimeout(function () {
          o(e + l);
        }, l);
      return (f = e + l), r;
    }),
    window.cancelAnimationFrame ||
      (window.cancelAnimationFrame = function (o) {
        clearTimeout(o);
      });
  var u = window,
    m = document;
  if (
    !(
      "scrollBehavior" in m.documentElement.style &&
      !0 !== u.__forceSmoothScrollPolyfill__
    )
  ) {
    var v = u.HTMLElement || u.Element,
      h = 468,
      w = {
        scroll: u.scroll || u.scrollTo,
        scrollBy: u.scrollBy,
        elementScroll: v.prototype.scroll || t,
        scrollIntoView: v.prototype.scrollIntoView,
      },
      y =
        u.performance && u.performance.now
          ? u.performance.now.bind(u.performance)
          : Date.now,
      b = o(u.navigator.userAgent) ? 1 : 0;
    (u.scroll = u.scrollTo = function () {
      void 0 !== arguments[0] &&
        (!0 !== l(arguments[0])
          ? a.call(
              u,
              m.body,
              void 0 !== arguments[0].left
                ? ~~arguments[0].left
                : u.scrollX || u.pageXOffset,
              void 0 !== arguments[0].top
                ? ~~arguments[0].top
                : u.scrollY || u.pageYOffset
            )
          : w.scroll.call(
              u,
              void 0 !== arguments[0].left
                ? arguments[0].left
                : "object" != typeof arguments[0]
                ? arguments[0]
                : u.scrollX || u.pageXOffset,
              void 0 !== arguments[0].top
                ? arguments[0].top
                : void 0 !== arguments[1]
                ? arguments[1]
                : u.scrollY || u.pageYOffset
            ));
    }),
      (u.scrollBy = function () {
        void 0 !== arguments[0] &&
          (l(arguments[0])
            ? w.scrollBy.call(
                u,
                void 0 !== arguments[0].left
                  ? arguments[0].left
                  : "object" != typeof arguments[0]
                  ? arguments[0]
                  : 0,
                void 0 !== arguments[0].top
                  ? arguments[0].top
                  : void 0 !== arguments[1]
                  ? arguments[1]
                  : 0
              )
            : a.call(
                u,
                m.body,
                ~~arguments[0].left + (u.scrollX || u.pageXOffset),
                ~~arguments[0].top + (u.scrollY || u.pageYOffset)
              ));
      }),
      (v.prototype.scroll = v.prototype.scrollTo = function () {
        if (void 0 !== arguments[0])
          if (!0 !== l(arguments[0])) {
            var o = arguments[0].left,
              t = arguments[0].top;
            a.call(
              this,
              this,
              void 0 === o ? this.scrollLeft : ~~o,
              void 0 === t ? this.scrollTop : ~~t
            );
          } else {
            if ("number" == typeof arguments[0] && void 0 === arguments[1])
              throw new SyntaxError("Value could not be converted");
            w.elementScroll.call(
              this,
              void 0 !== arguments[0].left
                ? ~~arguments[0].left
                : "object" != typeof arguments[0]
                ? ~~arguments[0]
                : this.scrollLeft,
              void 0 !== arguments[0].top
                ? ~~arguments[0].top
                : void 0 !== arguments[1]
                ? ~~arguments[1]
                : this.scrollTop
            );
          }
      }),
      (v.prototype.scrollBy = function () {
        void 0 !== arguments[0] &&
          (!0 !== l(arguments[0])
            ? this.scroll({
                left: ~~arguments[0].left + this.scrollLeft,
                top: ~~arguments[0].top + this.scrollTop,
                behavior: arguments[0].behavior,
              })
            : w.elementScroll.call(
                this,
                void 0 !== arguments[0].left
                  ? ~~arguments[0].left + this.scrollLeft
                  : ~~arguments[0] + this.scrollLeft,
                void 0 !== arguments[0].top
                  ? ~~arguments[0].top + this.scrollTop
                  : ~~arguments[1] + this.scrollTop
              ));
      }),
      (v.prototype.scrollIntoView = function () {
        if (!0 !== l(arguments[0])) {
          var o = c(this),
            t = o.getBoundingClientRect(),
            e = this.getBoundingClientRect();
          o !== m.body
            ? (a.call(
                this,
                o,
                o.scrollLeft + e.left - t.left,
                o.scrollTop + e.top - t.top
              ),
              "fixed" !== u.getComputedStyle(o).position &&
                u.scrollBy({ left: t.left, top: t.top, behavior: "smooth" }))
            : u.scrollBy({ left: e.left, top: e.top, behavior: "smooth" });
        } else
          w.scrollIntoView.call(this, void 0 === arguments[0] || arguments[0]);
      });
  }
}
"object" == typeof exports && "undefined" != typeof module
  ? (module.exports = { polyfill: polyfill })
  : polyfill();

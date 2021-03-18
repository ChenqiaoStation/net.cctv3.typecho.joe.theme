function Sketchpad(t) {
  for (var e in this.constructor.prototype) this[e] = this[e].bind(this);
  t.hasOwnProperty("element")
    ? ("string" == typeof t.element
        ? (this.element = $(t.element))
        : (this.element = t.element),
      (this._width = t.width || this.element.attr("data-width") || 0),
      (this._height = t.height || this.element.attr("data-height") || 0),
      (this.color = t.color || this.element.attr("data-color") || "#000000"),
      (this.penSize = t.penSize || this.element.attr("data-penSize") || 5),
      (this.readOnly = t.readOnly || this.element.attr("data-readOnly") || !1),
      this.readOnly || this.element.css({ cursor: "crosshair" }),
      (this.strokes = t.strokes || []),
      (this._currentStroke = { color: null, size: null, lines: [] }),
      (this.undoHistory = t.undoHistory || []),
      (this.animateIds = []),
      (this._sketching = !1),
      this.reset())
    : console.error("SKETCHPAD ERROR: No element selected");
}
(Sketchpad.prototype._cursorPosition = function (t) {
  return {
    x: t.pageX - $(this.canvas).offset().left,
    y: t.pageY - $(this.canvas).offset().top,
  };
}),
  (Sketchpad.prototype._draw = function (t, e, s, i) {
    this._stroke(t, e, s, i, "source-over");
  }),
  (Sketchpad.prototype._erase = function (t, e, s, i) {
    this._stroke(t, e, s, i, "destination-out");
  }),
  (Sketchpad.prototype._stroke = function (t, e, s, i, o) {
    this.context.save(),
      (this.context.lineJoin = "round"),
      (this.context.lineCap = "round"),
      (this.context.strokeStyle = s),
      (this.context.lineWidth = i),
      (this.context.globalCompositeOperation = o),
      this.context.beginPath(),
      this.context.moveTo(t.x, t.y),
      this.context.lineTo(e.x, e.y),
      this.context.closePath(),
      this.context.stroke(),
      this.context.restore();
  }),
  (Sketchpad.prototype._mouseDown = function (t) {
    (this._lastPosition = this._cursorPosition(t)),
      (this._currentStroke.color = this.color),
      (this._currentStroke.size = this.penSize),
      (this._currentStroke.lines = []),
      (this._sketching = !0),
      this.canvas.addEventListener("mousemove", this._mouseMove);
  }),
  (Sketchpad.prototype._mouseUp = function (t) {
    this._sketching &&
      (this.strokes.push($.extend(!0, {}, this._currentStroke)),
      (this._sketching = !1)),
      this.canvas.removeEventListener("mousemove", this._mouseMove);
  }),
  (Sketchpad.prototype._mouseMove = function (t) {
    var e = this._cursorPosition(t);
    this._draw(this._lastPosition, e, this.color, this.penSize),
      this._currentStroke.lines.push({
        start: $.extend(!0, {}, this._lastPosition),
        end: $.extend(!0, {}, e),
      }),
      (this._lastPosition = e);
  }),
  (Sketchpad.prototype._touchStart = function (t) {
    t.preventDefault(),
      this._sketching ||
        ((this._lastPosition = this._cursorPosition(t.changedTouches[0])),
        (this._currentStroke.color = this.color),
        (this._currentStroke.size = this.penSize),
        (this._currentStroke.lines = []),
        (this._sketching = !0),
        this.canvas.addEventListener("touchmove", this._touchMove, !1));
  }),
  (Sketchpad.prototype._touchEnd = function (t) {
    t.preventDefault(),
      this._sketching &&
        (this.strokes.push($.extend(!0, {}, this._currentStroke)),
        (this._sketching = !1)),
      this.canvas.removeEventListener("touchmove", this._touchMove);
  }),
  (Sketchpad.prototype._touchCancel = function (t) {
    t.preventDefault(),
      this._sketching &&
        (this.strokes.push($.extend(!0, {}, this._currentStroke)),
        (this._sketching = !1)),
      this.canvas.removeEventListener("touchmove", this._touchMove);
  }),
  (Sketchpad.prototype._touchLeave = function (t) {
    t.preventDefault(),
      this._sketching &&
        (this.strokes.push($.extend(!0, {}, this._currentStroke)),
        (this._sketching = !1)),
      this.canvas.removeEventListener("touchmove", this._touchMove);
  }),
  (Sketchpad.prototype._touchMove = function (t) {
    t.preventDefault();
    var e = this._cursorPosition(t.changedTouches[0]);
    this._draw(this._lastPosition, e, this.color, this.penSize),
      this._currentStroke.lines.push({
        start: $.extend(!0, {}, this._lastPosition),
        end: $.extend(!0, {}, e),
      }),
      (this._lastPosition = e);
  }),
  (Sketchpad.prototype.reset = function () {
    (this.canvas = this.element[0]),
      (this.canvas.width = this._width),
      (this.canvas.height = this._height),
      (this.context = this.canvas.getContext("2d")),
      this.redraw(this.strokes),
      this.readOnly ||
        (this.canvas.addEventListener("mousedown", this._mouseDown),
        this.canvas.addEventListener("mouseout", this._mouseUp),
        this.canvas.addEventListener("mouseup", this._mouseUp),
        this.canvas.addEventListener("touchstart", this._touchStart),
        this.canvas.addEventListener("touchend", this._touchEnd),
        this.canvas.addEventListener("touchcancel", this._touchCancel),
        this.canvas.addEventListener("touchleave", this._touchLeave));
  }),
  (Sketchpad.prototype.drawStroke = function (t) {
    for (var e = 0; e < t.lines.length; e++) {
      var s = t.lines[e];
      this._draw(s.start, s.end, t.color, t.size);
    }
  }),
  (Sketchpad.prototype.redraw = function (t) {
    for (var e = 0; e < t.length; e++) this.drawStroke(t[e]);
  }),
  (Sketchpad.prototype.toObject = function () {
    return {
      width: this.canvas.width,
      height: this.canvas.height,
      strokes: this.strokes,
      undoHistory: this.undoHistory,
    };
  }),
  (Sketchpad.prototype.toJSON = function () {
    return JSON.stringify(this.toObject());
  }),
  (Sketchpad.prototype.animate = function (t, e, s) {
    this.clear();
    for (var i = t, o = null, h = 0; h < this.strokes.length; h++)
      for (var n = this.strokes[h], r = 0; r < n.lines.length; r++) {
        var a = n.lines[r];
        (o = this._draw.bind(this, a.start, a.end, n.color, n.size)),
          this.animateIds.push(setTimeout(o, i)),
          (i += t);
      }
    e &&
      ((s = s || 0),
      (o = this.animate.bind(this, t, e, s)),
      this.animateIds.push(setTimeout(o, i + s)));
  }),
  (Sketchpad.prototype.cancelAnimation = function () {
    for (var t = 0; t < this.animateIds.length; t++)
      clearTimeout(this.animateIds[t]);
  }),
  (Sketchpad.prototype.clear = function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }),
  (Sketchpad.prototype.undo = function () {
    this.clear();
    var t = this.strokes.pop();
    t && (this.undoHistory.push(t), this.redraw(this.strokes));
  }),
  (Sketchpad.prototype.redo = function () {
    var t = this.undoHistory.pop();
    t && (this.strokes.push(t), this.drawStroke(t));
  });

var drawCircle          = function(ctx, x, y, color, radius) {

  ctx.strokeStyle       = null;
  ctx.fillStyle         = color;

  var _radius           = radius || 2.0;

  ctx.beginPath();
  ctx.arc(x, y, _radius, 0, 2 * Math.PI);
  ctx.fill();
};

var drawCircles         = function(ctx, array, color, radius) {

  ctx.strokeStyle       = null;
  ctx.fillStyle         = color;

  var _radius           = radius || 2.0;

  for(var i = 0; i < array.length; ++i) {

    ctx.beginPath();
    ctx.arc(array[i].x, array[i].y, _radius, 0, 2 * Math.PI);
    ctx.fill();
  }
};

var drawRect            = function(ctx, rect, color, lineWidth) {
  ctx.strokeStyle       = color;
  ctx.fillStyle         = null;

  ctx.lineWidth         = lineWidth || 1.0;

  ctx.beginPath();
  ctx.rect(rect.x, rect.y, rect.width, rect.height);
  ctx.stroke();
};

var drawRects           = function(ctx, rects, color, lineWidth) {
  ctx.strokeStyle       = color;
  ctx.fillStyle         = null;

  ctx.lineWidth         = lineWidth || 1.0;

  for(var i = 0; i < rects.length; ++i) {

    var rect            = rects[i];
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.stroke();
  }
};
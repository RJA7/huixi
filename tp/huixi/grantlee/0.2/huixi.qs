var exportData = function (tp) {
  var writePivotPoints = tp.settings.writePivotPoints;
  var allSprites = tp.allSprites;
  var atlas = {};

  for (var i = 0, l = allSprites.length; i < l; i++) {
    var sprite = allSprites[i];
    var frameRect = sprite.frameRect;
    var sourceRect = sprite.sourceRect;
    var untrimmedSize = sprite.untrimmedSize;
    var scale9Enabled = sprite.scale9Enabled;
    var scale9Borders = sprite.scale9Borders;
    var pivotPoint = sprite.pivotPoint;
    var frame = [];

    frame.push(frameRect.x, frameRect.y, frameRect.width, frameRect.height);
    frame.push(sourceRect.x, sourceRect.y, untrimmedSize.width, untrimmedSize.height);
    writePivotPoints && frame.push(pivotPoint.x, pivotPoint.y);
    scale9Enabled && frame.push(scale9Borders.x, scale9Borders.y, scale9Borders.width, scale9Borders.height);

    atlas[sprite.trimmedName] = frame;
  }

  var data = JSON.stringify(atlas).replace(/"/g, '').slice(0, -1) + ',__huixi__:{smartupdate:"' + tp.smartUpdateKey + '"}}';

  return ';(function(d){try{module.exports=d;}catch(e){window.huixi=window.huixi||{};window.huixi.atlas = window.huixi.atlas||{};window.huixi.atlas[' + tp.texture.trimmedName + ']=d;}})(' + data + ');';
};

exportData.filterName = 'exportData';
Library.addFilter('exportData');

synthquencer.drag = [];
synthquencer.drag.state = false

synthquencer.drag.move = function(evt) {
    if (!synthquencer.drag.state) { return };
    const tileObj = evt.target;
    const tile = synthquencer.tiles.find( ({ id }) => id === tileObj.id)
    tile.changeState(tile, tileObj)
}

synthquencer.drag.start = function(evt) {
    synthquencer.drag.state = true;
}

synthquencer.drag.stop = function(evt) {
    synthquencer.drag.state = false;
}
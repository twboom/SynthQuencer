// General control class
export class Control {
    actions = {};

    constructor(element) {
        this.element = element;
    };

    addEventListener(event, callback) {
        if (action[event] === undefined) { action[event] = []; };
        action[event].push(callback);
    }

    removeEventListener() {
        
    }
};

// Toggle play/stop button
export class PlayButton extends Control {
    constructor(element, callback) {
        super(element, 'click', callback);
    };
}
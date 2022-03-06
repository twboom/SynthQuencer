import { project } from "./SynthQuencer.js";

// General control class
export class Control {
    actions = {};

    constructor(element) {
        this.element = element;
    };

    addEventListener(event, callback, id) {
        if (this.actions[event] === undefined) { this.actions[event] = []; };
        this.actions[event].push({callback, id});
        this.element.addEventListener(event, callback);
    };

    removeEventListener(id) {
        Object.entries(this.actions).forEach(([event, obj]) => {
            callbacks = obj.filter(obj => obj.id !== id);
            callbacks.forEach(callback => {
                this.element.removeEventListener(event, callback);
            });
        });
    };
};

// Play/Stop Button
export class PlayButton extends Control {
    constructor(element) {
        super(element);
        this.addEventListener('click', this.toggle);
    };

    toggle() {
        project.toggle();
    };
};

// Stop Button
export class StopButton extends Control {
    constructor(element) {
        super(element);
        this.addEventListener('click', this.stop);
    };

    stop() {
        project.stop();
    };
};
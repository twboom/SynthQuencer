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
export class PlayPauseButton extends Control {
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

// Tempo input
export class TempoInput extends Control {
    constructor(element, scrollSpeed = 120) {
        super(element);
        this.addEventListener('change', _ => this.change());
        this.addEventListener('wheel', evt => {
            this.scroll(evt, scrollSpeed);
        });
        this.element.value = project.tempo;
    };

    change() {
        project.tempo = parseInt(this.element.value);
        project.restart();
    };

    scroll(evt, scrollSpeed) {
        const deltaT = evt.wheelDeltaY / scrollSpeed;
        const newValue = parseInt(this.element.value) + deltaT;
        if (newValue < parseInt(this.element.min)) { return };
        this.element.value = parseInt(this.element.value) + deltaT;
        this.change();
    }
};
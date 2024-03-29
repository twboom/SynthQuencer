import { project } from "./SynthQuencer.js";

/* Control inputs */
// General control class
export class Control {
    actions = {};

    constructor(element) {
        this.element = element;
        project.attach(this);
    };

    addEventListener(event, callback, id, options) {
        if (this.actions[event] === undefined) { this.actions[event] = []; };
        this.actions[event].push({callback, id});
        this.element.addEventListener(event, callback, options);
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
        this.addEventListener('click', _ => this.toggle());
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
        this.addEventListener('dblclick', _ => this.dblclick());
        this.addEventListener('wheel', evt => {
            this.scroll(evt, scrollSpeed);
        }, undefined, { passive: true });
        this.element.value = project.tempo;
        this.default = project.tempo;
    };

    change() {
        project.tempo = parseInt(this.element.value);
        project.restart();
    };

    dblclick() {
        this.element.value = this.default;
        this.change();
    }

    scroll(evt, scrollSpeed) {
        evt.preventDefault();
        const deltaT = evt.wheelDeltaY / scrollSpeed;
        const newValue = parseInt(this.element.value) + deltaT;
        if (newValue < parseInt(this.element.min) || newValue > parseInt(this.element.max)) { return };
        this.element.value = parseInt(this.element.value) + deltaT;
        this.change();
    }
};

// Instrument control
export class InstrumentControl extends Control {
    displays = []; // List of attached displays
    
    constructor(element, instrument) {
        super(element);
        this.instrument = instrument;
        this.default = this.element.value;
        this.addEventListener('input', _ => this.change());
        this.addEventListener('dblclick', _ => this.dblclick());
    };

    change() {
        this.instrument.updateProperty(this.element.name, this.element.value);
        this.displays.forEach(display => display.update(this.element.value));
    };

    dblclick() {
        this.element.value = this.default;
        this.change();
    }

    attachDisplay(display) {
        this.displays.push(display);
        display.update(this.element.value);
    };
}

/* Control displays */
// General display class
export class Display {
    constructor(element) {
        this.element = element;
        project.attach(this);
    };

    update(value) {
        this.element.innerHTML = value;
    };
}

// Instrument control display
export class InstrumentDisplay extends Display {
    constructor(element) {
        super(element);
    };
}
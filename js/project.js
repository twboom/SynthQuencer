import { getType } from './utility.js';
import { PlayPauseButton } from './controls.js';

// Project class
export class Project {

    tempo = 120; // Tempo in BPM
    interface = new AudioContext(); // Universal audio context

    // Project info
    info = {
        name: 'My Jam',
        author: 'Thijs',
    }

    instruments = []; // Array of intruments
    renderers = []; // Array of renderers
    sequencers = []; // Array of sequencers
    controls = []; // Array of all controls
    displays = []; // Array of all control displays

    running = false; // Boolean for if the project is running

    constructor(tempo, info) {
        if (tempo !== this.tempo && (!isNaN(parseFloat(tempo)))) { this.tempo = tempo; } // Change tempo if nessary
        if (info !== undefined) { this.info = {...this.info, ...info} };
    };

    attach(obj) {
        
        switch(getType(obj)) {
            case 'INSTRUMENT':
                this.instruments.push(obj);
                break;

            case 'RENDERER':
                this.renderers.push(obj);
                break;

            case 'SEQUENCER':
                this.sequencers.push(obj);
                break;

            case 'CONTROL':
                this.controls.push(obj);
                break;

            case 'DISPLAY':
                this.displays.push(obj);
                break;
        };

    };

    start() {
        this.sequencers.forEach(seq => {
            seq.start();
        });
        this.running = true;
        this.controls.forEach(ctrl => {
            if (ctrl instanceof PlayPauseButton) {
                ctrl.element.classList.remove('play');
                ctrl.element.classList.add('pause');
            }
        });
    };

    pause() {
        this.sequencers.forEach(seq => {
            seq.pause();
        });
        this.running = false;
        this.controls.forEach(ctrl => {
            if (ctrl instanceof PlayPauseButton) {
                ctrl.element.classList.remove('pause');
                ctrl.element.classList.add('play');
            }
        });
    };

    stop() {
        this.sequencers.forEach(seq => {
            seq.stop();
        });
        this.running = false;
        this.controls.forEach(ctrl => {
            if (ctrl instanceof PlayPauseButton) {
                ctrl.element.classList.remove('pause');
                ctrl.element.classList.add('play');
            }
        });
    };

    toggle() {
        if (this.running) { this.pause() } else { this.start() };
    };

    restart() {
        if (this.running) {
            this.pause();
            this.start();
        };
    };
};
import { project } from './SynthQuencer.js';
import { Note } from './instrument.js';
import { getType, getMS } from './utility.js';

// Sequencer class
export class Sequencer {

    type = 'SEQUENCER';

    size = [16, 16];
    baseNote = 69;

    instruments = [];
    renderers = [];

    play = {
        'step': 0,
    };

    memory = [];

    constructor(size, baseNote, instruments, renderers) {
        if (size) {
            if (
                size.length === 2 &&
                !isNaN(size[0]) &&
                !isNaN(size[1]) &&
                isFinite(size[0]) &&
                isFinite(size[1]) &&
                size[0] % 1 === 0 &&
                size[1] % 1 === 0 &&
                size[0] > 0 &&
                size[1] > 0
            ) { this.size = size } else {
                console.error('Invalid size, set to [16,16]');
            }
        };
        if (baseNote) { this.baseNote = baseNote };
        if (Array.isArray(instruments)) { this.instruments.concat(instruments) };
        if (Array.isArray(renderers)) { this.renderers.concat(renderers) };

        for (let y = 0; y < this.size[1]; y++) {
            const line = [];
            this.memory.push(line);
            for (let x = 0; x < this.size[0]; x++) {
                const note = new Note(this.baseNote + x, 0, 127, false);
                line.push(note);
            }
        }
    }

    // Function for toggling notes
    toggle([x, y]) {
        const note = this.memory[y][x];
        note.toggle();

        this.renderers.forEach(renderer => {
            renderer.update('TOGGLE_NOTE', [x, y]);
        });

        console.log(`Toggled (${x},${y})`);
    }

    // Function for attaching instruments and renderers
    attach(obj) {
        
        switch(getType(obj)) {
            case 'INSTRUMENT':
                this.instruments.push(obj);
                break;

            case 'RENDERER':
                this.renderers.push(obj);
                break;
        }

    }

    decouple(type, obj) {

        switch(type) {
            case 'INSTRUMENT':
                const inst = this.instruments.findIndex( ({ id }) => id === obj);
                this.instruments.splice(inst, 1);
                break;

            case 'RENDERER':
                const renderer = this.renderers.findIndex( ({ id }) => id === obj);
                this.renderers.splice(renderer, 1);
                break;
        }

    }

    // Functions for playing

    playStep(step) {
        this.instruments.forEach(inst => {
            const line = this.memory[step];
            line.forEach(note => {
                if (note.active) {
                    inst.play(note);
                    console.log('playing', note.note)
                }
            });
        })
        this.renderers.forEach(renderer => {
            renderer.update('CHANGE_STEP', step);
        });
    };

    tick() {
        this.playStep(this.play.step);

        this.play.step++;

        if (this.play.step >= this.size[1]) {
            this.play.step = 0;
        }
    }

    start() {
        this.interval = setInterval(
            _ => { this.tick(); },
            getMS(project.tempo) / 4
        )
    }

    stop() {
        clearInterval(this.interval);
    }
}
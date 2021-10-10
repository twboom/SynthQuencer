// Sequencer class
class Sequencer {

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
        if (size) { this.size = size };
        if (baseNote) { this.baseNote = baseNote };
        if (Array.isArray(instruments)) { this.instruments.concat(instruments) };
        if (Array.isArray(renderers)) { this.renderers.concat(renderers) };

        for (let x = 0; x < this.size[0]; x++) {
            const line = [];
            this.memory.push(line);
            for (let y = 0; y < this.size[1]; y++) {
                const note = new Note(this.baseNote + y, 0, 127, false);
                line.push(note);
            }
        }
    }

    // Function for toggling notes
    toggle(x, y) {
        if (Array.isArray(x) && y === undefined) {
            y = x[1];
            x = x[0];
        }

        const note = this.memory[x][y];
        note.toggle();

        this.renderers.forEach(renderer => {
            renderer.update('TOGGLE_NOTE', [x, y]);
        });

        console.log(`Toggled (${x},${y})`)
    }

    // Function for attaching instruments and renderers
    attach(obj) {
        
        switch(utility.getType(obj)) {
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
                }
            });
        })
        this.renderers.forEach(renderer => {
            renderer.update('CHANGE_STEP', step);
        });
    };

    tick() {
        console.log(this.play.step)
        this.playStep(this.play.step);

        this.play.step++;

        if (this.play.step >= this.size[0]) {
            this.play.step = 0;
        }
    }

    start() {
        this.interval = setInterval(
            _ => { this.tick(); },
            utility.getMS(project.tempo) / 4
        )
    }

    stop() {
        clearInterval(this.interval);
    }
}
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
        const note = this.memory[x][y];
        note.toggle();
    }

    // Function for attaching instruments and renderers
    attach(obj) {
        
        switch(utility.getType(obj)) {
            case 'INSTRUMENT':
                if (obj.type === 'INSTRUMENT') {
                    this.instruments.push(obj);
                    break;
                }
                const inst = project.instruments.find( ({ id }) => id === obj);
                this.instruments.push(inst);
                break;

            case 'RENDERER':
                if (obj.type === 'RENDERER') {
                    this.renderers.push(obj);
                    break;
                }
                const renderer = project.renderers.find( ({ id }) => id === obj);
                this.renderers.push(renderer);
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
    };

    tick() {
        this.playStep(this.play.step);

        this.play.step++;
    }

    start() {
        this.interval = setInterval(
            _ => { this.tick(); },
            utility.getMS(project.tempo)
        )
    }

    stop() {
        clearInterval(this.interval);
    }
}
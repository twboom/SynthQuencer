// Sequencer class
class Sequencer {

    size = [16, 16];

    instruments = [];
    renderers = [];

    constructor(size, instruments, renderers) {
        if (size) { this.size = size };
        if (Array.isArray(instruments)) { this.instruments.concat(instruments) };
        if (Array.isArray(renderers)) { this.renderers.concat(renderers) };
    }

    // Function for attaching instruments and renderers
    attach(type, obj_id) {
        
        switch(type) {
            case 'instrument':
                const inst = project.instruments.find( ({ id }) => id === obj_id);
                this.instruments.push(inst);
                break;

            case 'renderer':
                const renderer = project.renderers.find( ({ id }) => id === obj_id);
                this.renderers.push(renderer);
                break;
        }

    }

    decouple(type, obj_id) {

        switch(type) {
            case 'instrument':
                const inst = this.instruments.findIndex( ({ id }) => id === obj_id);
                this.instruments.splice(inst, 1);
                break;

            case 'renderer':
                const renderer = this.renderers.findIndex( ({ id }) => id === obj_id);
                this.renderers.splice(renderer, 1);
                break;
        }

    }

    // Functions for playing
    next() {}

    start() {
        setInterval(
            _ => {

            },
            utility.getMS(project.tempo)
        )
    }

    stop() {}
}
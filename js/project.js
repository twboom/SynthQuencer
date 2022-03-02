// Project class
export class Project {

    tempo = 120; // Tempo in BPM
    interface = new AudioContext(); // Universal audio context

    // Project info
    info = {
        name: 'My Jam',
        author: 'Thijs',
    }

    synthesizers = []; // Array of synthesizers
    renderers = []; // Array of renderers

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
        }

    }

};
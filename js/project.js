// Project class
class Project {

    tempo = 120; // Tempo in BPM
    interface = new AudioContext(); // Universal audio context

    // Project info
    info = {
        name: 'My Jam',
        author: 'Thijs',
    }

    constructor(tempo, info) {
        this.tempo = tempo; // Change tempo if nessary
        if (info !== undefined) { this.info = {...this.info, ...info} };
    };

};
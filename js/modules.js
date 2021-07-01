/*
Following are all the parts of the synthesizer
Might be used to build an modular synthesizer
*/

// Oscillator
class Oscillator {

    constructor(wave, transpose, detune) {

        this.wave = wave; // Availabe waves: sine, triangle, square, sawtooth
        this.transpose = transpose; // Transposition in semitones
        this.detune = detune; // Detune in cents
        

        // Utility code
        this.connections = new Set();

    };

    play(note, velocity) {
        const intf = new AudioContext();
        const oscOBJ = this.osc({note: note, velocity: velocity}, intf)
        
        let stopTime = intf.currentTime;
        if (this.gainEnvelope !== undefined) {
            const env = this.gainEnvelope;
            stopTime += env.attack + env.decay + env.release;
        } else {
            stopTime += 1
        };

        oscOBJ.start();
        oscOBJ.stop(stopTime)

    }
    
    // Create an oscillator for a note that you can play
    // USAGE: osc(noteOBJ, intf).start()
    osc({note, velocity}, intf) {
        const osc = intf.createOscillator(); // Create oscillator

        osc.type = this.wave; // Set wave
        osc.frequency.value = utility.midiToFrequency(note); // Set frequency
        
        const gain = intf.createGain();
        if (this.gainEnvelope === undefined) { // In case there is no envelope for gain

            gain.gain.setValueAtTime(velocity,0);

        } else { // There is an envelope for gain

            // Shorter names
            const gn = gain.gain;
            const env = this.gainEnvelope;
            const zero = utility.zero;
            const current = intf.currentTime;

            gn.setValueAtTime(zero, intf.currentTime) // Start with zero volume
            
            switch (env.type) {

                case 'LINEAR':
                    gn.linearRampToValueAtTime(velocity, current + env.attack)
                    gn.linearRampToValueAtTime(env.sustain * velocity, current + env.attack + env.decay)
                    gn.linearRampToValueAtTime(0, current + env.attack + env.decay + env.release)
                    break;

                case 'EXPONENTIAL':
                    gn.exponentialRampToValueAtTime(zero + velocity, current + env.attack)
                    gn.exponentialRampToValueAtTime(zero + env.sustain * velocity, current + env.attack + env.decay)
                    gn.exponentialRampToValueAtTime(zero, current + env.attack + env.decay + env.release)
                    break;

            };

        };

        osc.connect(gain);
        gain.connect(intf.destination);
        
        return osc
    };

    connect(obj) {

        switch(obj.obj) {

            case 'ENVELOPE':
                this.gainEnvelope = obj;
                break;

            case undefined:
                console.error('No object to connect')
                return;

            default:
                new Error('Invalid object')
                return;

        };

        this.connections.add(obj.obj)

    };

    deconnect(connection) {

        if (connection === 'ALL') {
            this.connections.clear();
        } else {
            if (!this.connections.has(connection)) {
                console.error(`Couldn't remove ${connection}, the connection ${connection} was not present`);
                return
            };

            this.connections.delete(connection)
        };

    };

};

// Envelope
class Envelope {
    
    constructor({attack, decay, sustain, release}, type) {

        // Allowed envelope types
        const allowedTypes = ['EXPONENTIAL', 'LINEAR']

        if (type == undefined) { console.error('No envelope type specified'); return false }

        // Check if type is allowed
        if (!allowedTypes.includes(type.toUpperCase)) {
            
            new Error('Invalid envelope type');

        };

        this.obj = 'ENVELOPE' // Type declaration
        
        this.type = type.toUpperCase()

        this.attack = attack; // Attack in seconds
        this.decay = decay; // Decay in seconds
        this.sustain = sustain; // Sustain level, 0 <-> 1
        this.release = release; // Release in seconds

    };

};

// Sequencer Grid
class Sequencer {
    
    constructor(notes, steps) {

        // Container for sequencer
        this.sequencer = document.createElement('div');
        this.sequencer.classList = 'sequencer';

        // Rows and notes
        const rows = [];
        const buttons = [];

        for (let y = 0; y < steps; y++) {
            
            const row = document.createElement('div');

            // Notes in a row
            for (let x = 0; x < notes; x++) {

                const btn = document.createElement('button');
                btn.classList = 'sequencer-button';
                row.appendChild(btn);
                buttons.push(btn);

            };

            rows.push(row);
            this.sequencer.appendChild(row);

        };

    };

    create(target) {

        target.appendChild(this.sequencer)

    }

};

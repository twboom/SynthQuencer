// Complete synthesizer
class Synth {

    constructor() {

        // Properties
        this.wave = 'sine'; // Wave, availabe waves: sine, triangle, square, sawtooth

        // Creating SYNTH HTML

    };

};

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

    }
    
    // Create an oscillator for a note that you can play
    // USAGE: osc(noteOBJ, intf).start()
    osc({note, velocity}, intf) {
        const osc = intf.createOscillator(); // Create oscillator

        osc.type = this.wave; // Set wave
        osc.frequency.value = utility.midiToFrequency(note); // Set frequency
        
        const gain = intf.createGain();
        gain.gain.setValueAtTime(velocity,0);

        osc.connect(gain);
        gain.connect(intf.destination);
        
        return osc
    }
}

// Envelope
class Envelope {
    
    constructor({attack, decay, sustain, release}) {

        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;

    }

}
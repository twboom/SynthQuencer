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

    };
    
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
                break;

            default:
                new Error('Invalid object')
                break;

        }

    }

}

// Envelope
class Envelope {
    
    constructor({attack, decay, sustain, release}, type) {

        // Allowed envelope types
        const allowedTypes = ['EXPONENTIAL', 'LINEAR']

        if (type == undefined) { console.error('No envelope type specified'); return false }

        // Check if type is allowed
        if (!allowedTypes.includes(type.toUpperCase)) {
            
            new Error('Invalid envelope type')

        }

        this.obj = 'ENVELOPE' // Type declaration
        
        this.type = type.toUpperCase()

        this.attack = attack; // Attack in seconds
        this.decay = decay; // Decay in seconds
        this.sustain = sustain; // Sustain level, 0 <-> 1
        this.release = release; // Release in seconds

    };

};

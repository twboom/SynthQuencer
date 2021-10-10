// General instrument class
class Instrument {
    properties = {
        'transpose': 0,
        'detune': 0,
        'tuning': 440,
        'velocity': 127,
    };

    constructor(properties) {
        if (properties !== undefined) { this.properties = {...this.properties, ...properties} };
    };
};

// Synthesizer class
class Synthesizer extends Instrument {

    env = {
        'attack': 0.01,
        'decay': 0.1,
        'sustain': 0.5,
        'release': 0.1,
    };

    constructor(properties, env) {

        super({wave: 'sine'})

        if (properties !== undefined) { this.properties = {...this.properties, ...properties} };
        if (env !== undefined) { this.env = {...this.env, ...env} };

    };

    play({note, velocity, duration}) {
        // Declare contants
        const properties = this.properties;
        const env = this.env;

        const sustain = env.sustain * (velocity / 127);

        // Create a new oscillator
        const intf = new AudioContext();
        const osc = intf.createOscillator();

        // Set the wave type and frequency
        osc.type = properties.wave;
        osc.frequency.value = utility.noteToFrequency(note, properties);

        // Create a gain node
        const gain = intf.createGain();

        // Create the envelope
        gain.gain.setValueAtTime(0, intf.currentTime); // Initial value
        gain.gain.linearRampToValueAtTime(sustain, intf.currentTime + env.attack); // attack
        gain.gain.linearRampToValueAtTime(sustain, intf.currentTime + env.attack + env.decay); // decay
        gain.gain.linearRampToValueAtTime(0, intf.currentTime + env.attack + env.decay + env.sustain + duration + env.release); // release

        // Connect the oscillator to the gain node
        osc.connect(gain);
        gain.connect(intf.destination);

        const passtime = env.attack + env.decay + env.sustain + env.release + duration;
        osc.start(0);
        osc.stop(intf.currentTime + passtime);
    };

};

// Note class
class Note {
    
    constructor(note, duration, velocity, active) {
        this.note = note;
        this.duration = duration;
        this.velocity = velocity;
        
        if (typeof active === 'boolean') {
            this.active = active;
        } else { this.active = true };
    };

    toggle() {
        this.active = !this.active;
    }
    
};
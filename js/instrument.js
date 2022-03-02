import { project } from './SynthQuencer.js';
import { noteToFrequency } from './utility.js';

// General instrument class
export class Instrument {
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
export class Synthesizer extends Instrument {

    constructor(properties, env) {

        super({wave: 'sine'})

        if (!(env instanceof Envelope)) { throw new Error('Invalid or no envelope provided') };
        this.env = env;

        console.log(env)

        if (properties !== undefined) { this.properties = {...this.properties, ...properties} }; // Override default properties
    };

    play({note, velocity, duration}) {
        // Declare contants
        const properties = this.properties;
        const env = this.env;

        const sustain = env.sustain * (velocity / 127);

        // Create a new oscillator
        const intf = project.interface;
        const osc = intf.createOscillator();

        // Set the wave type and frequency
        osc.type = properties.wave;
        osc.frequency.value = noteToFrequency(note, properties);

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
export class Note {
    
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

// Envelope class
export class Envelope {

    instruments = [];
    renderers = [];

    constructor(attack, decay, sustain, release) {

        if (attack instanceof Envelope) {
            attack = attack.attack;
            decay = attack.decay;
            sustain = attack.sustain;
            release = attack.release;
        }

        // Complete missing values
        if (attack === undefined) { attack = 0.01 };
        if (decay === undefined) { decay = 0.1 };
        if (sustain === undefined) { sustain = 0.5 };
        if (release === undefined) { release = 0.1 };

        this.attack = attack;
        this.decay = decay;
        this.sustain = sustain;
        this.release = release;

    };

};
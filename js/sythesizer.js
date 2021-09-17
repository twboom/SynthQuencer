// Synthesizer class
class Synthesizer {

    synth = {
        'wave': 'sine',
        'transpose': 0,
        'detune': 0,
        'tuning': 440,
        'velocity': 127,
    }
    env = {
        'attack': 0.01,
        'decay': 0.1,
        'sustain': 0.5,
        'release': 0.1,
    }

    constructor(synth, env) {

        if (synth !== undefined) { this.synth = {...this.synth, ...synth} };
        if (env !== undefined) { this.env = {...this.env, ...env} };

    }

    play({note, velocity, duration}) {
        // Declare contants
        const synth = this.synth;
        const env = this.env;

        const sustain = env.sustain * (velocity / 127);

        // Create a new oscillator
        const intf = new AudioContext();
        const osc = intf.createOscillator();

        // Set the wave type and frequency
        osc.type = this.synth.wave;
        osc.frequency.value = utility.noteToFrequency(note, synth);

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
    }

}
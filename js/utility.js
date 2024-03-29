import { Renderer } from "./renderer.js";
import { Instrument, Note } from "./instrument.js";
import { Sequencer } from "./sequencer.js";
import { Control, Display } from "./controls.js";

// MIDI note to frequency
export function noteToFrequency(note, {transpose, detune, tuning, octave}) {
    if (!transpose) { transpose = 0; };
    if (!detune) { detune = 0; };
    if (!tuning) { tuning = 440; };
    if (!octave && octave !== 0) { octave = 4; };

    octave -= 4;
    transpose += octave * 12;

    note += transpose;
    note -= 69;

    let frequency = Math.pow(2, note / 12) * tuning;

    if (detune) {
        const fullDetune = detune > 0 ? 1 : -1;
        const refNote = note + fullDetune;
        const refFreq = Math.pow(2, refNote / 12) * tuning;
        const freqDiff = refFreq - frequency;
        const cent = (freqDiff / 100) * fullDetune;
        frequency += detune * cent;
    }

    
    return frequency;
};


// Get BPM from milliseconds
export function getBPM(milliseconds) {
    const bpm = Math.round(60000 / milliseconds);
    return bpm;
};

// Get milliseconds from BPM
export function getMS(bpm) {
    const ms = 60000 / bpm;
    return ms;
};

// Get the object type
export function getType(object) {
    
    if (object instanceof Renderer) { return 'RENDERER' };
    if (object instanceof Instrument) { return 'INSTRUMENT' };
    if (object instanceof Note) { return 'NOTE' };
    if (object instanceof Sequencer) { return 'SEQUENCER' };
    if (object instanceof Control) { return 'CONTROL' };
    if (object instanceof Display) { return 'DISPLAY' };
    
};

// Generates a unique ID for everything
let LAST_USED_ID = 0

export function generateID() {
    LAST_USED_ID++;
    return LAST_USED_ID;
};

// Capitalize first letter
export function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
};
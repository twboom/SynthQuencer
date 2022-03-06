import { Project } from './project.js';
import { Envelope, Synthesizer } from './instrument.js';
import { Sequencer } from './sequencer.js';
import { SequencerRenderer } from './renderer.js';
import { PlayPauseButton, StopButton, TempoInput } from './controls.js';

function init() {
    // Create the Project object
    const project = new Project();
    return project;
}

function start() {
    // Create the envelope
    const myEnv = new Envelope();
    // Create the synthesizer
    const mySynth = new Synthesizer({ wave: 'sawtooth' }, myEnv);
    // Create the sequencer and attach the synthesizer
    const mySeq = new Sequencer([16, 16]);
    mySeq.attach(mySynth);
    
    // Create the sequencer renderer and render
    const myRen = new SequencerRenderer(document.getElementById('grid'), mySeq);
    mySeq.attach(myRen);
    myRen.render();
    
    // Activate the controls
    const playButton = new PlayPauseButton(document.getElementById('toggle'));
    const stopButton = new StopButton(document.getElementById('stop'));
    const tempoInput = new TempoInput(document.getElementById('tempo'));
};

// Create project and export
export const project = init();

// Create the elements
start();
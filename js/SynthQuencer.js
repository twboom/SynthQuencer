import { Project } from './project.js';
import { Envelope, Synthesizer } from './instrument.js';
import { Sequencer } from './sequencer.js';
import { SequencerRenderer } from './renderer.js';

function start() {

    // Create the Project object
    const project = new Project();

    // Create the envelope
    const myEnv = new Envelope();
    // Create the synthesizer
    const mySynth = new Synthesizer({ wave: 'sawtooth' }, myEnv);
    // Create the sequencer and attach the synthesizer
    const mySeq = new Sequencer([16, 16]);
    mySeq.attach(mySynth);
    
    // Create the sequencer renderer and render
    const myRen = new SequencerRenderer(document.getElementById('main'), mySeq);
    mySeq.attach(myRen);
    myRen.render();

    console.log(myRen)

    return project;
};

// Create project and export
export const project = start();
import { Project } from './project.js';
import { Envelope, Synthesizer } from './instrument.js';
import { Sequencer } from './sequencer.js';
import { ControlRenderer, InputControlRenderer, SequencerRenderer, WaveSelectControlRenderer } from './renderer.js';
import { InstrumentControl, InstrumentDisplay, PlayPauseButton, StopButton, TempoInput } from './controls.js';
import { Modal } from './modal.js'

function init() {
    // Create the Project object
    const project = new Project();
    return project;
}

function start() {
    
    
    // Activate the controls
    const playButton = new PlayPauseButton(document.getElementById('toggle'));
    const stopButton = new StopButton(document.getElementById('stop'));
    const tempoInput = new TempoInput(document.getElementById('tempo'));

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

    // Sequencer/Synth controls
    const waveControlRenderer = new ControlRenderer(document.getElementById('synth-controls'), mySynth, 'wave');
    const waveSelectControlRenderer = new WaveSelectControlRenderer(waveControlRenderer.inputContainer, mySynth);
    waveControlRenderer.render();
    waveSelectControlRenderer.render();
    const waveControl = new InstrumentControl(waveSelectControlRenderer.element, mySynth);

    const octaveControlRenderer = new ControlRenderer(document.getElementById('synth-controls'), mySynth, 'octave');
    const octaveInputControlRenderer = new InputControlRenderer(octaveControlRenderer.inputContainer, mySynth, 'octave', 0, 8, 1, 4);
    octaveControlRenderer.render();
    octaveInputControlRenderer.render();
    const octaveControl = new InstrumentControl(octaveInputControlRenderer.element, mySynth);
    octaveControl.attachDisplay(new InstrumentDisplay(octaveControlRenderer.display));

    const transposeControlRenderer = new ControlRenderer(document.getElementById('synth-controls'), mySynth, 'transpose');
    const transposeInputControlRenderer = new InputControlRenderer(transposeControlRenderer.inputContainer, mySynth, 'transpose', -12, 12, 1);
    transposeControlRenderer.render();
    transposeInputControlRenderer.render();
    const transposeControl = new InstrumentControl(transposeInputControlRenderer.element, mySynth);
    transposeControl.attachDisplay(new InstrumentDisplay(transposeControlRenderer.display));

    const detuneControlRenderer = new ControlRenderer(document.getElementById('synth-controls'), mySynth, 'detune');
    const detuneInputControlRenderer = new InputControlRenderer(detuneControlRenderer.inputContainer, mySynth, 'detune', -100, 100, 1);
    detuneControlRenderer.render();
    detuneInputControlRenderer.render();
    const detuneControl = new InstrumentControl(detuneInputControlRenderer.element, mySynth);
    detuneControl.attachDisplay(new InstrumentDisplay(detuneControlRenderer.display));

    // Update the synth to match the options
    mySynth.updateProperty('wave', waveControl.element.value)

    console.log(project)
};

// Create project and export
export const project = init();

window.currentProject = project;

// Create the elements
start();
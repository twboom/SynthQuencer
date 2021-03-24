synthquencer.actions = [];

// Toggle action
synthquencer.actions.toggle = function() {
    console.log(`Toggling SynthQuencer`)
    synthquencer.interface = new AudioContext();
    const button = document.querySelector('button#toggle.controls')
    if (synthquencer.state.active) { button.innerHTML = 'Start' }
    else { button.innerHTML = 'Stop' }
    synthquencer.toggle()
}
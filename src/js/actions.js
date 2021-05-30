synthquencer.actions = [];

// Toggle action
synthquencer.actions.toggle = function() {
    synthquencer.notes = [];
    console.log(`Toggling SynthQuencer`)
    synthquencer.interface = new AudioContext();
    const button = document.querySelector('button#toggle.controls')
    if (synthquencer.state.active) { button.innerHTML = 'Start' }
    else { button.innerHTML = 'Stop' }
    synthquencer.toggle()
}

synthquencer.actions.reset = function() {
    // Code beneath is currently not in use, but I'm keeping it in for later (hopefully)
    /*
    const state = synthquencer.prompt.new({
        'title': 'Are you sure?',
        'body': 'This action will clear your entire grid and is irreversible'
    }, 'verify')
    */
    state = confirm('Are you sure?\nThis action will reset the entire grid and cannot be undone')
    if (state) {
        synthquencer.frame.remove();
        synthquencer.frame.create(session.wave);
        console.log('Grid was cleared')
    }

    else {
        console.log('Grid was not cleared')
    }
}
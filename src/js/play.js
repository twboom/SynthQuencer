synthquencer.sound = function(note, wave) {
    const interface = new AudioContext();
    const oscillator = interface.createOscillator();
    oscillator.type = wave;
    oscillator.frequency.value = synthquencer.utility.getFrequency(note);
    const gainNode = interface.createGain();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, interface.currentTime + 1);
    oscillator.connect(gainNode);
    gainNode.connect(interface.destination);
    oscillator.start(0);
    oscillator.stop(interface.currentTime + 0.5)
    synthquencer.stats.stats.played++
}

synthquencer.playRow = function(synth, step) {
    const row = document.querySelectorAll(`div#synth-${synth} button.tile[data-step="${step}"][data-activated=true]`)
    if (row.length === 0) { return }
    const wave = row[0].getAttribute('data-wave')
    for (let i = 0; i < row.length; i++) {
        const note = (row[i].getAttribute('data-note'))
        synthquencer.sound(note, wave)
    }
}

synthquencer.tick = function(synth, step) {
    lastStep = step - 1;
    if (step === 0) { lastStep = 15 };
    synthquencer.playRow(synth, step)
        {
            const row = document.querySelectorAll(`button.tile[data-step="${step}"]`)
            for (let i = 0; i < row.length; i++) {
                row[i].setAttribute('data-isplaying', true)
            }
        }
        {
            const row = document.querySelectorAll(`button.tile[data-step="${lastStep}"]`)
            for (let i = 0; i < row.length; i++) {
                row[i].setAttribute('data-isplaying', false)
            }
        }
}

synthquencer.deactivate = function() {
    clearInterval(synthquencer.clock);
    document.querySelectorAll('button.tile[data-isplaying=true]').forEach(item => {
        item.setAttribute('data-isplaying', false)
    })
    synthquencer.state.active = false;
};

synthquencer.toggle = function() {
    let step = 0;
    if (synthquencer.state.active) {
        synthquencer.deactivate()
        return
    }
    synthquencer.state.active = true
    synthquencer.clock = setInterval(_ => {
        for (let i = 0; i < synthquencer.synths.length; i++) {
            synthquencer.tick(i, step);
        };
        step += 1;
        if (step == 16) { step = 0 };
    }, synthquencer.config.speed);
};
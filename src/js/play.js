synthquencer.getFrequency = function(midiNote) {
    note = midiNote - 68
    frequency = synthquencer.config.tuning * 2 ** (note / 12)
    return frequency
}

synthquencer.sound = function(note, wave) {
    const interface = new AudioContext();
    const oscillator = interface.createOscillator();
    oscillator.type = wave;
    oscillator.frequency.value = synthquencer.getFrequency(note);
    const gainNode = interface.createGain();
    gainNode.gain.exponentialRampToValueAtTime(0.0001, interface.currentTime + 1);
    oscillator.connect(gainNode);
    gainNode.connect(interface.destination);
    oscillator.start(0);
    oscillator.stop(interface.currentTime + 0.5)
}

synthquencer.playRow = function(step) {
    const row = document.querySelectorAll(`button.tile[data-step="${step}"][data-activated=true]`)
    if (row.length === 0) { return }
    const wave = row[0].getAttribute('data-wave')
    for (let i = 0; i < row.length; i++) {
        const note = (row[i].getAttribute('data-note'))
        synthquencer.sound(note, wave)
    }
}

synthquencer.run = function() {
    let clock;
    let thisRow = 0
    let lastRow;
    clock = setInterval(_ => {
        synthquencer.playRow(thisRow)
        {
            const row = document.querySelectorAll(`button.tile[data-step="${thisRow}"]`)
            for (let i = 0; i < row.length; i++) {
                row[i].setAttribute('data-isplaying', true)
            }
        }
        {
            const row = document.querySelectorAll(`button.tile[data-step="${lastRow}"]`)
            for (let i = 0; i < row.length; i++) {
                row[i].setAttribute('data-isplaying', false)
            }
        }
        lastRow = thisRow
        thisRow += 1
        if (thisRow == 16) { thisRow = 0}
    }, 100)
}
synthquencer.tile = class {
    constructor(wave, note, step) {
        this.wave = wave;
        this.note = note;
        this.step = step;
        this.activated = false;
    }
    
    create(parent) {
        const id = `${this.wave}-${this.note}-${this.step}`
        const tile = document.createElement('button')
        tile.setAttribute('class', 'tile')
        tile.setAttribute('data-wave', this .wave)
        tile.setAttribute('data-note', this.note)
        tile.setAttribute('data-step', this.step)
        tile.setAttribute('data-activated', false)
        tile.setAttribute('data-isPlaying', false)
        tile.setAttribute('id', id)
        tile.addEventListener('click', _ => {
            if (this.activated) {
                this.activated = false;
                tile.setAttribute('data-activated', 'false')
                console.log(`Deactivated ${this.wave}, ${this.note}, ${this.step}`)
            }
            else {
                this.activated = true;
                tile.setAttribute('data-activated', 'true')
                console.log(`Activated ${this.wave}, ${this.note}, ${this.step}`)
            }
        })
        parent.appendChild(tile)
    }
}

synthquencer.frame = []
synthquencer.frame.create = function(wave) {
    const frame = document.getElementById('frame')
    const notes = synthquencer.config.notes;
    const steps = synthquencer.config.steps;
    for (let i = 0; i < steps; i++) {
        const step = document.createElement('div')
        for (let x = 0; x < notes; x++) {
            const note = synthquencer.config.startNote + x
            const tile = new synthquencer.tile(wave, note, i)
            tile.create(step)
        }
        document.getElementById('sequencer').appendChild(step)
    }
}
synthquencer.interface = [];

synthquencer.interface.update = function(evt) {
    const input = evt.target;
    const display = document.querySelector(`span.${input.id}.display`)
    const target = synthquencer.utility.getTarget(input.id)
    target[input.id] = parseFloat(input.value);
    if (display === null) { return }
    display.innerHTML = input.value;
    console.log(`Set ${input.id} to ${input.value}`)
}

synthquencer.interface.init = function() {
    document.querySelectorAll('span.display').forEach(item => {
        const label = item.classList[0];
        const display = document.querySelector('span.' + label);
        const input = document.querySelector('input#' + label);
        const target = synthquencer.utility.getTarget(label)
        const value = target[label]
        display.innerHTML = value;
        input.value = value;
    })
}

document.querySelectorAll('input.control').forEach(item => {
    item.addEventListener('input', synthquencer.interface.update)
})

// Speed slider
document.querySelector('input[type=range].control#speed').addEventListener('mouseup', synthquencer.updateTickspeed)

// Toggle button
document.querySelector('button#toggle.controls').addEventListener('click', synthquencer.actions.toggle)

// Reset grid button
document.querySelector('button#reset-grid').addEventListener('click', synthquencer.actions.reset)

// Kill sound button
document.querySelector('button#kill-sound').addEventListener('click', synthquencer.killSound)
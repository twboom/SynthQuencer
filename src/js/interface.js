synthquencer.interface = [];

synthquencer.interface.update = function(evt) {
    console.log(evt)
    const input = evt.target;
    const display = document.querySelector(`span.${input.id}.display`)
    const target = synthquencer.utility.getTarget(input.id)
    target[input.id] = parseInt(input.value);
    if (display === null) { return }
    display.innerHTML = input.value
}

synthquencer.interface.init = function() {
    document.querySelectorAll('span.display').forEach(item => {
        const label = item.classList[0];
        const display = document.querySelector('span.' + label);
        const input = document.querySelector('input#' + label);
        const target = synthquencer.utility.getTarget(label)
        const value = target[label]
        display.innerHTML = value;
        input.value = value
    })
}

document.querySelectorAll('input.control').forEach(item => {
    item.addEventListener('mouseup', synthquencer.interface.update)
})

// Toggle button
document.querySelector('button#toggle.controls').addEventListener('click', _ => {
    for (let i = 0; i < synthquencer.synths.length; i++) {
        synthquencer.toggle()
    }
})
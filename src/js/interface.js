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

document.querySelectorAll('input.control').forEach(item => {
    item.addEventListener('mouseup', synthquencer.interface.update)
})

// Toggle button
document.querySelector('button#toggle.controls').addEventListener('click', _ => {
    for (let i = 0; i < synthquencer.synths.length; i++) {
        synthquencer.toggle()
    }
})
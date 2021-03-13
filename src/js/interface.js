synthquencer.interface = [];

synthquencer.interface.update = function(evt) {
    const input = evt.target;
    const display = document.querySelector(`span.${input.id}.display`)
    
}

document.querySelectorAll('input.control').forEach(item => {
    item.addEventListener('mouseup', evt => {

    })
})

// Toggle button
document.querySelector('button#toggle.controls').addEventListener('click', _ => {
    for (let i = 0; i < synthquencer.synths.length; i++) {
        synthquencer.run(i)
    }
})
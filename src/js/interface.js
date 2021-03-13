// Toggle button
document.querySelector('button#toggle.controls').addEventListener('click', _ => {
    for (let i = 0; i < synthquencer.synths.length; i++) {
        synthquencer.run(i)
    }
})
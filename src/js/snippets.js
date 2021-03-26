synthquencer.snippets = [];

synthquencer.snippets.show = function(el) {
    console.log(el)
}

synthquencer.snippets.init = function() {
    document.querySelectorAll('.snippet').forEach(item => {
        let timer;
        item.addEventListener('mouseover', evt => {
            timer = setTimeout(synthquencer.snippets.show, 2000, evt)
        })
        item.addEventListener('mouseout', _ => { clearTimeout(timer) })
    })
}
synthquencer.snippets.show = function(el) {
    const snippetID = el.target.id;
    const snippet = synthquencer.snippets.data[snippetID]
    if (snippet === undefined) { return }
    console.log(snippet)
    synthquencer.snippets.display(snippet)
}

synthquencer.snippets.display = function(snippet) {
    const div = document.createElement('div')
    div.setAttribute('class', 'snippet-container')
    
    const title = document.createElement('h1')
    title.setAttribute('class', 'snippet-title')
    title.innerHTML = snippet.title

    const text = document.createElement('p')
    text.setAttribute('class', 'snippet-text')
    text.innerHTML = snippet.text

    div.appendChild(title)
    div.appendChild(text)
    document.querySelector('main').appendChild(div)
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
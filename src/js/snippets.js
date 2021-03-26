synthquencer.snippets.config = {
    'hoverTimer': 2000
}

synthquencer.snippets.show = function(el) {
    const snippetID = el.target.id;
    const snippet = synthquencer.snippets.data[snippetID]
    if (snippet === undefined) { return }
    synthquencer.snippets.createSnippet(snippet)
    console.log(`Shown ${el.target.id} snippet`)
}

synthquencer.snippets.createSnippet = function(snippet) {
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
    document.body.appendChild(div)
}

synthquencer.snippets.init = function() {
    document.querySelectorAll('.snippet').forEach(item => {
        let timer;
        let shown = false;
        item.addEventListener('mouseover', evt => {
            timer = setTimeout(evt => {
                synthquencer.snippets.show(evt);
                shown = true;
            }, synthquencer.snippets.config.hoverTimer, evt)
        })
        item.addEventListener('mouseout', _ => {
            clearTimeout(timer);
            if (shown) {
                document.querySelector('div.snippet-container').remove()
            }
        })
    })
}
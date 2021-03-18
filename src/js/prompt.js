synthquencer.prompt = [];
synthquencer.prompt.verify = function(content) {
    // Creating elements
    const prompt = document.createElement('div');
    const body = document.createElement('div');
    const title = document.createElement('h1');
    const text = document.createElement('p');
    const deny = document.createElement('button');
    const accept = document.createElement('button');

    // Filling in contents
    title.innerHTML = content.title
    text.innerHTML = content.body
    deny.innerHTML = 'Deny'
    accept.innerHTML = 'Accept'

    // Setting attributes
    prompt.setAttribute('class', 'prompt');
    prompt.setAttribute('id', 'prompt-outer');
    body.setAttribute('class', 'prompt');
    body.setAttribute('id', 'body');
    title.setAttribute('class', 'prompt');
    text.setAttribute('class', 'prompt');
    deny.setAttribute('class', 'prompt deny');
    accept.setAttribute('class', 'prompt accept');

    // EventListeners for the buttons
    deny.addEventListener('click', synthquencer.prompt.close);
    accept.addEventListener('click', synthquencer.prompt.close);
    
    // Appending the elements to the correct parrent
    body.appendChild(title);
    body.appendChild(text);
    body.appendChild(deny);
    body.appendChild(accept);
    prompt.appendChild(body);
    document.body.appendChild(prompt);
};

synthquencer.prompt.close = function(evt) {
    const target = evt.target;
    let state = (target.classList[1])
    const prompt = document.querySelector('div.prompt#prompt-outer')
    switch (state) {
        case 'deny':
            state = false;
            break;
        
        case 'accept':
            state = true;
            break;
    }

    prompt.remove()

    console.log(state)
    return state
};

synthquencer.prompt.new = function(content, mode) {
    let response;

    if (mode === undefined) { throw new Error('Undefined mode') }
    if (mode === 'verify') {
        response = synthquencer.prompt.verify(content)
    }

    console.log(response)
    return response
}
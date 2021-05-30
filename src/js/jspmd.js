/*
=============================================================================================================
This code comes from an unreleased version of JSPMD, you can find JSPMD here: https://github.com/twboom/jspmd
=============================================================================================================
*/

const jspmd = [];
jspmd.headers = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

// Prepare Markdown
jspmd.prepare = function(md) {
    return md.split(/\r?\n/);
}

// Print the MD to the page
jspmd.print = function(content, targetQuery) {
    const parent = document.createElement('div')
    for (let i = 0; i < content.length; i++) {
        const line = document.createElement(content[i].tag);
        if (!(content[i].tag === 'hr')) {
            line.innerHTML = content[i].content
        }
        if (jspmd.headers.includes(content[i].tag)) {
            const id = content[i].content.toLowerCase().replaceAll(' ', '-').replaceAll(/[()?]/g, '')
            console.log(id)
            line.setAttribute('id', id)
        }
        parent.appendChild(line)
    }
    document.querySelector(targetQuery).appendChild(parent)

    if (window.location.hash) {
        document.getElementById(window.location.hash.replaceAll('#', '')).scrollIntoView()
    }
}

// Parse prepared Markdown
jspmd.parse = function(pmd) {
    const content = [];
    for (let i = 0; i < pmd.length; i++) {
        const line = pmd[i];
        if (line === '') { continue }

        const mdTag = line.split(/ +/g)[0];

        let htmlTag;
        let lineContent = line.slice(mdTag.length)
        if (lineContent.charAt(0) === ' ') {
            lineContent = lineContent.substring(1)
        }

        switch(mdTag) {
            case '#':
                htmlTag = 'h1';
                if (i > 0) { content.push({'tag': 'hr'}) }
                break;

            case '##':
                htmlTag = 'h2';
                break;
            
            case '###':
                htmlTag = 'h3';
                break;

            case '####':
                htmlTag = 'h4';
                break;

            case '#####':
                htmlTag = 'h5';
                break;

            case '######':
                htmlTag = 'h6';
                break;
            
            default:
                htmlTag = 'p';
                lineContent = line;
                break;
        }
        content.push({
            'tag': htmlTag,
            'content': lineContent
        })
    }
    return content
}
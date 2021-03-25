/*
=============================================
This code comes from an unreleased version of JSPMD, you can find JSPMD here: https://github.com/twboom/jspmd
=============================================
*/

let jspmd = [];

// Prepare Markdown
jspmd.prepare = function(md) {
    return md.split(/\r?\n/);
}

// Print the MD to the page
jspmd.print = function(content, targetQuery) {
    const parent = document.createElement('div')
    for (let i = 0; i < content.length; i++) {
        const line = document.createElement(content[i].tag);
        if (content[i].tag === 'hr') {
        }
        else {
            line.innerHTML = content[i].content
        }
        parent.appendChild(line)
    }
    document.querySelector(targetQuery).appendChild(parent)
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
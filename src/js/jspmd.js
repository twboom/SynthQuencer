/*
=============================================
This code comes from an unreleased version of JSPMD, you can find it here: https://github.com/twboom/jspmd
=============================================
*/

let jspmd = [];

// Prepare Markdown
jspmd.prepare = function(md) {
    return md.split(/\r?\m/);
}

// Print the MD to the page
jspmd.print = function(content, targetQuery) {
    const parent = document.createElement('div')
    for (let i = 0; i < content.length; i++) {
        const line = document.createElement(content[i].tag);
        line.innerHTML;
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

        switch(mdTag) {
            case '#':
                htmlTag = 'h1';
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
                htmlTag = 'p'
        }

        content.push({
            'tag': htmlTag,
            'content': line.slice(mdTag.length)
        })
    }
    return content
}
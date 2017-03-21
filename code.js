var syntax = {
    c: [
        {pattern: /(\"[^"]+\")/g, replace: '<span class="string">$1</span>'},
        {pattern: /(\'[\\\w]{1,2}\')/g, replace: '<span class="chr">$1</span>'},
        {pattern: /([\/\/]{2}.*)/g, replace: '<span class="comment">$1</span>'},
        {pattern: /(#.*)/g, replace: '<span class="directive">$1</span>'},
        {pattern: /(^|\n| +)\b([A-Z0-9]{1}[a-z0-9]+)\b\s+([\*\w\d]+)/g, replace: '$1<span class="type">$2</span> $3'},
        {pattern: /\b(typename|template|typedef|struct|this|public|private|new|delete|if|else|continue|for|return|printf|scanf|switch|case|default|brake)\b/ig, replace: '<span class="keyword">$1</span>'},
        {pattern: /\b(static|const|int|bool|double|float|char|void|long)\b/ig, replace: '<span class="type">$1</span>'},
        {pattern: /( *([\w\d]+)? )?([~\w\d_]+)\(/ig, replace: '$1<span class="function">$3</span>('},
        {pattern: /\b(\d*\.?\d+|true|false)\b/ig, replace: '<span class="number">$1</span>'},
        {pattern: /(class)\s+([\w\d]+)/ig, replace: '<span class="type">$1 <span class="function">$2</span></span>'},
    ]
}

window.onload = function () {
    var codes = document.getElementsByTagName('code');
    var spoilers = document.getElementsByClassName('spoiler');

    if ( codes ) {
        initCode(codes);
    }
    if (spoilers) {
        initSpoiler(spoilers);
    }

}

function initCode(codes) {
    for ( var i = 0; i < codes.length; i++ ) {
        var lang = codes[i].getAttribute('data-lang');
        var filename = codes[i].getAttribute('data-file');
        
        if (lang) {
            var code = codes[i];
            var parent = code.parentNode;
            var wrapper = document.createElement('div');
            var lines = document.createElement('aside');

            wrapper.className = 'code';
            if ( filename ) {
                wrapper.setAttribute('data-file', filename);
                wrapper.className += ' file';
            }

            for ( var j = 0; j < code.innerHTML.split('\n').length; j++ ) {
                var pre = document.createElement('pre');

                pre.appendChild(document.createTextNode(j+1));
                lines.appendChild(pre);
            }

            parent.replaceChild(wrapper, code);
            wrapper.appendChild(lines);
            wrapper.appendChild(code);

            highlight(code, lang);
        }
    }
}

function initSpoiler(spoilers) {
    for ( var i = 0; i < spoilers.length; i++ ) {
        var spoiler = spoilers[i];
        var link = spoiler.children[0];
        var content = spoiler.children[1];

        if ( link.nodeName === 'A' ) {
            link.addEventListener('click', function () {
                if ( isHidden(content) == true ) {
                    content.className = 'open';
                    link.className = 'open';
                } else {
                    content.className = '';
                    link.className = '';
                }
            }, false)
        }
    }
}

function highlight(element, lang) {
    var choiсe = syntax[lang];

    for ( var i = 0; i < choiсe.length; i++ ) {
        element.innerHTML = element.innerHTML.replace(choiсe[i].pattern, choiсe[i].replace);
    }
}

function isHidden(element) {
    var elementWidth = element.offsetWidth;
    var elementHeight = element.offsetHeight;

    return elementWidth == 0 || elementHeight == 0;
}

function show(element) {
    element.style.display = 'block';
}

function hide(element) {
    element.style.display = 'none';
}

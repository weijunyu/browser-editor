export default {
    modes: [
        { name: 'text', mode: 'null', icon: 'fas fa-font' },
        { name: 'html', mode: 'text/html', icon: 'fab fa-html5' },
        { name: 'xml', mode: 'xml', icon: 'fas fa-code' },
        { name: 'javascript', mode: 'javascript', icon: 'fab fa-js-square' },
        { name: 'typescript', mode: 'application/typescript', icon: 'fab fa-js-square' },
        { name: 'json', mode: 'application/json', icon: 'fab fa-js-square' },
        { name: 'python', mode: 'python', icon: 'fab fa-python' },
        { name: 'shell', mode: 'shell', icon: 'fas fa-terminal' },
        { name: 'sql', mode: 'sql', icon: 'fas fa-database' },
        { name: 'yaml', mode: 'yaml', icon: 'fas fa-bars' },
        { name: 'dockerfile', mode: 'dockerfile', icon: 'fab fa-docker' },
    ],
    configurables: [
        'electricChars', // boolean; [true] = reindent automatically when specific character is typed, if mode supports
        'indentUnit', // integer; [2] How many spaces a block (whatever that means in the edited language) should be indented. The default is 2.
        'indentWithTabs', // boolean; [false] Whether, when indenting, the first N*tabSize spaces should be replaced by N tabs. Default is false.
        'lineNumbers', // boolean; [false]
        'lineSeparator', // string | null; [null] = split on CRLF/LF/CR; LF used in output, e.g. getValue()
        'lineWrapping', // boolean; [false] = scroll, true = wrap
        'showCursorWhenSelecting', // boolean; [false]
        'smartIndent', // boolean; [true] = context sensitive indentation provided by mode, false = indent same as previous line
        'tabSize', // integer; [4]
        // addons
        'matchBrackets',
        'autoCloseBrackets', // from addon/edit/closebrackets.js
        'styleActiveLine' // from addon/selection/active-line.js
    ],
    themes: {
        light: [
            '3024-day',
            'duotone-light',
            'eclipse',
            'neo',
        ],
        dark: [
            'darcula',
            'dracula',
            'hopscotch',
            'monokai',
        ]
    }
}
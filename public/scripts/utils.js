const EXTENSIONS = {
    sh: "bash",
    clike: "c-like",
    coffee: "coffeescript",
    cs: "csharp",
    dpr: "delphi",
    erl: "erlang",
    hs: "haskell",
    js: "javascript",
    kt: "kotlin",
    tex: "latex",
    lsp: "lisp",
    mk: "makefile",
    md: "markdown",
    mm: "objectivec",
    phptemp: "php-template",
    pl: "perl",
    txt: "plaintext",
    py: "python",
    pyrepl: "python-repl",
    rb: "ruby",
    rs: "rust",
    sc: "scala",
    sm: "smalltalk",
    ts: "typscript",
    vbs: "vbscript",
    html: "xml",
    htm: "xml",
};

function htmlEscape(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
}

function byType(type){
    for (let key in EXTENSIONS)
        if (EXTENSIONS[key] === type)
            return key;
    return type;
}
const documentId = window.location.href.split("/").pop().split(".")[0];
const highlight = window.location.href.split("/").pop().split(".")[1];

document.getElementById("doc-id").innerText = documentId;

fetch(`${location.protocol}//${location.host}/api/v1/public/documents/${documentId}`)
    .then(response => response.json())
    .then(json => {
        const content = document.getElementById("content");
        const extension = highlight ? EXTENSIONS[highlight] || highlight : "txt";
        try {
            if (extension === 'txt') {
                content.innerHTML = htmlEscape(json.data);
            } else if (extension) {
                content.innerHTML = hljs.highlight(json.data, {
                    language: extension
                }).value;
            }
        } catch (err) {
            content.innerHTML = hljs.highlightAuto(json.data).value;
        }
        hljs.lineNumbersBlock(content);
        document.getElementById("copy-to-clipboard").addEventListener("click", () => {
            navigator.clipboard.writeText(json.data);
            showMessage("Copied to clipboard");
        });
    })
    .catch(error => {
        console.error(error);
    });

document.querySelectorAll("a[data-local]")
    .forEach(a => {
        const ref = a.getAttribute("href");
        a.href = `${location.protocol}//${location.host}/document/${documentId}${ref}`
    });
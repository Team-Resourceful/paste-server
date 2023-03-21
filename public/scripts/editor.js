
document.getElementById("content").addEventListener("keydown", (e) => {
    if (e.key === 'Tab') {
        const content = document.getElementById("content");

        e.preventDefault();
        const start = content.selectionStart;
        const end = content.selectionEnd;

        content.value = content.value.substring(0, start) + "    " + content.value.substring(end);
        content.selectionStart = content.selectionEnd = start + 4;
    }
});
document.getElementById("save-content").addEventListener("click", () => {
    const content = document.getElementById("content").value;
    if (content.length > 0) {
        fetch(`${location.protocol}//${location.host}/api/v1/public/documents`, {
            method: "POST",
            body: content
        })
        .then(response => response.json())
        .then(json => {
            if (json && json.key) {
                let output;
                try {
                    output = hljs.highlightAuto(content);
                }catch (err) {
                    output = {language: null};
                }


                document.location.href = `${location.protocol}//${location.host}/document/${json.key}${output.language ? `.${byType(output.language)}` : ""}`;
            } else {
                showMessage("Invalid response from server");
            }
        })
        .catch((error) => {
            if (error.status === 413) {
                showMessage("Document too large");
            } else {
                showMessage("Error creating document");
            }
        });
    }
});
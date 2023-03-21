
function showMessage(message) {
    const messageBox = document.getElementById("message-box");
    messageBox.innerText = message;
    messageBox.disabled = false;
    messageBox.show();
    setTimeout(() => {
        messageBox.close();
        messageBox.disabled = true;
    }, 5000);
}
const qrInput = document.getElementById("qr-input")
const generateBtn = document.getElementById("generate-btn")
const qrContainer = document.getElementById("qr-code")

let qrcode = new QRCode(qrContainer, {
    width: 150,
    height: 150,
});

generateBtn.addEventListener("click", () => {
    let text = qrInput.value.trim();

    if (text) {
        qrcode.clear();
        qrcode.makeCode(text);
    } else {
        alert("Please add some text or URL!");
    }
});

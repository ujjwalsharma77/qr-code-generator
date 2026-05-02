const qrInput = document.getElementById("qr-input")
const generateBtn = document.getElementById("generate-btn")
const qrContainer = document.getElementById("qr-code")
const downloadBtn = document.getElementById("download-btn")

let qrcode = new QRCode(qrContainer, {
    width: 150,
    height: 150,
});

generateBtn.addEventListener("click", () => {
    let text = qrInput.value.trim();

    if (text) {
        qrcode.clear();
        qrcode.makeCode(text);
        
        setTimeout (() => {
            const qrImg = qrContainer.querySelector("img");
            const qrcanvas = qrContainer.querySelector("canvas");

            if (qrImg && qrImg.src) {
                downloadBtn.style.display = "block";
            }
        }, 300);

    } else {  
        alert("Please add some text or URL!");
    }
});

downloadBtn.addEventListener("click", () => {
    const qrImg = qrContainer.querySelector("img");

    if (!qrImg || !qrImg.src) {
        alert("Please generate a QR code first!");
        return;
    }

    const downloadLink = document.createElement("a");
    downloadLink.href = qrImg.src;
    downloadLink.download = "my-qr-code.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    alert("QR Code downloade successfully!");
});

const urlInput = document.getElementById("url-input")
const shortenBtn = document.getElementById("shorten-btn")
const resultContainer = document.querySelector(".result-container")
const resultLink = document.getElementById("result-link")
const copyBtn = document.getElementById("result-btn")
const overlay = document.getElementById("modal-overlay")
// const closeModal = document.getElementById("close-modal")
const cutBtn = document.getElementById("cut-btn")

shortenBtn.addEventListener("click", async () => {
    let longurl = urlInput.value.trim();

    if (longurl) {
        shortenBtn.innerText = "Shortening...";

        try {
            const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(longurl)}`);

            if (response.ok) {
                const result = await response.text();
                resultLink.value = result;
                overlay.style.display = "flex";
                alert("Link Shortened Successfully!");
            }
            else {
                alert("Failed to shortened link!");
            }
        } catch (error) {
            alert("Error connecting to the shortening service.");
        } finally {
            shortenBtn.innertext = "Shorten URL";
        }
    } else {
        alert("Please enter some text or paste a link shorten!")
    }    
});

cutBtn.addEventListener("click", () => {
    overlay.style.display = "none";
});

copyBtn.addEventListener("click", () => {
    resultLink.select();
    navigator.clipboard.writeText(resultLink.value);
    alert("Link copied to clipboard!");
});

// closeModal.addEventListener("click", () => {
//     overlay.style.display = "none";
// });

// overlay.addEventListener("click", (e) => {
//     if (e.target === overlay) {
//         overlay.style.display = "none";
//     }
// });
      

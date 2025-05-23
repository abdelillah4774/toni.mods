function generateQRCode() {
  const url = document.getElementById("urlInput").value.trim();
  const qrContainer = document.getElementById("qrCodeContainer");
  const qrResult = document.getElementById("qrResult");
  const scanCountElement = document.getElementById("scanCount");

  qrContainer.innerHTML = "";

  if (!url || !isValidURL(url)) {
    alert("يرجى إدخال رابط صحيح.");
    return;
  }

  const redirectURL = `${window.location.origin}/visit.html?url=${encodeURIComponent(url)}`;

  QRCode.toCanvas(redirectURL, { width: 250 }, (err, canvas) => {
    if (err) {
      console.error(err);
      return;
    }

    qrContainer.appendChild(canvas);
    qrResult.classList.remove("hidden");

    const scanCount = parseInt(localStorage.getItem(url)) || 0;
    scanCountElement.innerText = scanCount;
  });
}

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

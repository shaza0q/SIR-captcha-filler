const checkbox = document.getElementById("toggleAuto");

chrome.storage.sync.get(["autoCaptchaEnabled"], (data) => {
  checkbox.checked = data.autoCaptchaEnabled ?? true;
});

checkbox.addEventListener("change", () => {
  chrome.storage.sync.set({
    autoCaptchaEnabled: checkbox.checked
  });
});

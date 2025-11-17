// Listen for click events on the entire page
document.addEventListener("click", async function (e) {

    // Check if user has disabled functionality
    const settings = await chrome.storage.sync.get(["autoCaptchaEnabled"]);
    if (settings.autoCaptchaEnabled === false) return;

    const el = e.target.closest("a");
    if (!el) return;

    const onclickAttr = el.getAttribute("onclick");

    // Detect ANY download link triggered via showCaptchaPopup()
    if (onclickAttr && onclickAttr.includes("showCaptchaPopup")) {
        console.log("Download link clicked → Auto-filling CAPTCHA…");

        fillCaptchaAutomatically();
    }

});

function fillCaptchaAutomatically() {
    setTimeout(() => {
        const captchaEl = document.querySelector("#captchaText");
        const inputEl = document.querySelector("#captchaInput");

        // NEW selector (more reliable)
        const submitBtn = document.querySelector("button[onclick*='verifyCaptcha']");

        if (captchaEl && inputEl) {

            const value =
                captchaEl.getAttribute("data-value") ||
                captchaEl.textContent.trim();

            inputEl.value = value;
            inputEl.dispatchEvent(new Event("input", { bubbles: true }));

            console.log("CAPTCHA auto-filled:", value);

            // Highlight input
            inputEl.style.border = "2px solid lime";
            setTimeout(() => inputEl.style.border = "", 1000);

            // Auto-submit (working version)
            if (submitBtn) {
                console.log("Submitting CAPTCHA form automatically...");
                setTimeout(() => {
                    submitBtn.click();
                }, 300);
            } else {
                console.warn("Submit button not found!");
            }
        }
    }, 350);
}


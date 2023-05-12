const colorContainer = document.getElementById("colorContainer");
const sortBtn = document.getElementById("sortBtn");
let sortDirection = "lowToHigh";


function generateColorShades(colorCode) {
    colorContainer.innerHTML = "";

  
    const baseColor = hexToRgb(colorCode);
    const step = 1 / 20;

    for (let i = 0; i < 20; i++) {
        const alpha = sortDirection === "lowToHigh" ? step * (i + 1) : 1 - step * (i + 1);
        const rgbaColor = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${alpha.toFixed(2)})`;
        const colorBox = document.createElement("div");
        colorBox.style.backgroundColor = rgbaColor;
        colorBox.className = "color-box";
        colorBox.addEventListener("click", () => {
            copyToClipboard(rgbaColor);
        });
        colorContainer.appendChild(colorBox);
    }
}


function hexToRgb(hex) {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return { r, g, b };
}


function copyToClipboard(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("Color code copied to clipboard: " + text);
}


function toggleSortDirection() {
    sortDirection = sortDirection === "lowToHigh" ? "highToLow" : "lowToHigh";
    generateColorShades(document.getElementById("colorCodeInput").value);
}


sortBtn.addEventListener("click", toggleSortDirection);

generateColorShades("#FF0000"); 
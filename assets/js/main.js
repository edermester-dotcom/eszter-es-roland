const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
    document.body.classList.add("fadeOut");

    setTimeout(() => {
        openChest();
    }, 1800);
});

function openChest() {
    document.body.classList.remove("fadeOut");

    document.body.innerHTML = `
        <div class="background"></div>

        <div class="chestScene">
            <div class="glow"></div>

            <div class="chest">📦</div>

            <h2>A legnagyobb kincset már megtaláltátok.</h2>

            <p>Egymásban.</p>

            <button onclick="openGift()">Nyissátok ki a ládát</button>
        </div>
    `;
}

function openGift() {
    const chest = document.querySelector(".chest");

    chest.style.transform = "scale(1.2)";
    chest.innerHTML = "✨";

    createHearts();
}

function createHearts() {
    for (let i = 0; i < 35; i++) {
        setTimeout(() => {
            const h = document.createElement("div");
            h.className = "heart";
            h.innerHTML = i % 5 === 0 ? "💸" : "💛";
            h.style.left = Math.random() * 100 + "vw";
            h.style.animationDuration = 4 + Math.random() * 3 + "s";
            h.style.fontSize = 24 + Math.random() * 24 + "px";
            document.body.appendChild(h);
        }, i * 160);
    }
}
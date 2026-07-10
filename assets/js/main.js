const startButton = document.getElementById("startButton");
const music = document.getElementById("bgMusic");

startButton.addEventListener("click", async () => {
  try {
    music.volume = 0;
    await music.play();
    fadeMusicTo(0.28, 4000);
  } catch (error) {
    console.error("A zene nem indult el:", error);
  }

  document.body.classList.add("fadeOut");

  setTimeout(() => {
    openChest();
  }, 1800);
});

function fadeMusicTo(targetVolume, duration) {
  const startVolume = music.volume;
  const steps = 40;
  const intervalTime = duration / steps;
  let step = 0;

  const timer = setInterval(() => {
    step++;
    const progress = step / steps;
    music.volume =
      startVolume + (targetVolume - startVolume) * progress;

    if (step >= steps) {
      music.volume = targetVolume;
      clearInterval(timer);
    }
  }, intervalTime);
}

function openChest() {
  document.body.classList.remove("fadeOut");

  document.body.innerHTML = `
    <div class="background"></div>

    <main id="app">
      <section class="chestScene">
        <div class="glow"></div>

        <div class="treasureChest">
          <div class="chestLid"></div>
          <div class="chestBody"></div>
          <div class="chestLock"></div>
        </div>

        <h2>A legnagyobb kincset már megtaláltátok.</h2>
        <p>Egymásban.</p>

        <button id="giftButton">
          Nyissátok ki a ládát
        </button>
      </section>
    </main>
  `;

  document
    .getElementById("giftButton")
    .addEventListener("click", openGift);
}

function openGift() {
  const chest = document.querySelector(".treasureChest");
  chest.classList.add("open");

  fadeMusicTo(0.16, 1200);

  setTimeout(() => {
    createHearts();
    fadeMusicTo(0.32, 2500);
  }, 1400);
}

function createHearts() {
  for (let i = 0; i < 45; i++) {
    setTimeout(() => {
      const item = document.createElement("div");
      item.className = "heart";
      item.textContent = i % 6 === 0 ? "💸" : "💛";
      item.style.left = Math.random() * 100 + "vw";
      item.style.fontSize = 24 + Math.random() * 24 + "px";
      item.style.animationDuration =
        4 + Math.random() * 3 + "s";

      document.body.appendChild(item);

      setTimeout(() => item.remove(), 7500);
    }, i * 120);
  }
}
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
  document.body.classList.add("fadeOut");
  setTimeout(openChest, 1800);
});

function openChest(){
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
        <button id="giftButton">Nyissátok ki a ládát</button>
      </section>
    </main>
  `;

  document.getElementById("giftButton").addEventListener("click", openGift);
}

function openGift(){
 const chest = document.querySelector(".treasureChest");
chest.classList.add("open");

  for(let i=0; i<45; i++){
    setTimeout(() => {
      const item = document.createElement("div");
      item.className = "heart";
      item.textContent = i % 6 === 0 ? "💸" : "💛";
      item.style.left = Math.random() * 100 + "vw";
      item.style.fontSize = (24 + Math.random() * 24) + "px";
      item.style.animationDuration = (4 + Math.random() * 3) + "s";
      document.body.appendChild(item);
    }, i * 120);
  }
}
const music = document.getElementById("bgMusic");
const entryScene = document.getElementById("entryScene");
const introScene = document.getElementById("introScene");
const chestScene = document.getElementById("chestScene");
const finalScene = document.getElementById("finalScene");

const enterButton = document.getElementById("enterButton");
const discoverButton = document.getElementById("discoverButton");
const openButton = document.getElementById("openButton");

const chestStage = document.getElementById("chestStage");
const sparkLayer = document.getElementById("sparkLayer");

let musicFadeTimer = null;
let introTimers = [];

/* BELÉPÉS */

enterButton.addEventListener("click", async () => {
  await startMusic();
  switchScene(entryScene, introScene);
  startIntro();
});

/* ÁTLÉPÉS A LÁDA JELENETÉBE */

discoverButton.addEventListener("click", () => {
  fadeMusicTo(0.18, 1200);
  switchScene(introScene, chestScene);

  const lines = [...document.querySelectorAll(".story-line")];

  lines.forEach((line) => {
    line.classList.remove("show");
  });

  /* Először csak a láda látszik */
  setTimeout(() => {
    openButton.classList.add("show");
  }, 1500);
});

/* LÁDANYITÁS */

openButton.addEventListener("click", () => {
  openButton.disabled = true;
  openButton.classList.remove("show");

  fadeMusicTo(0.08, 900);

  chestStage.classList.add("opening");

  setTimeout(() => {
    createSparks();
  }, 2100);

  setTimeout(() => {
    fadeMusicTo(0.28, 2400);
  }, 2500);

  const lines = [...document.querySelectorAll(".story-line")];

  /*
    A ládanyitás kb. 4,8 másodperc.
    Utána kb. 1 másodperc szünet következik.
  */

  setTimeout(() => {
    lines[0].classList.add("show");
  }, 5800);

  setTimeout(() => {
    lines[1].classList.add("show");
  }, 8600);

  setTimeout(() => {
    lines[2].classList.add("show");
  }, 11800);

  setTimeout(() => {
    switchScene(chestScene, finalScene);
    fadeMusicTo(0.16, 3200);
  }, 16500);
});

/* ZENE INDÍTÁSA */

async function startMusic() {
  try {
    music.volume = 0;
    await music.play();
    fadeMusicTo(0.28, 4000);
  } catch (error) {
    console.warn("A zene nem indult el:", error);
  }
}

/* JELENETVÁLTÁS */

function switchScene(fromScene, toScene) {
  fromScene.classList.remove("active");

  setTimeout(() => {
    toScene.classList.add("active");
  }, 320);
}

/* NYITÓ SZÖVEGEK */

function startIntro() {
  clearIntroTimers();

  const lines = [...document.querySelectorAll(".intro-line")];

  lines.forEach((line, index) => {
    const at = Number(line.dataset.at || 0);

    introTimers.push(
      setTimeout(() => {
        lines.forEach((otherLine) => {
          if (otherLine !== line) {
            otherLine.classList.remove("show");
            otherLine.classList.add("hide");
          }
        });

        line.classList.remove("hide");
        line.classList.add("show");
      }, at)
    );

    const next =
      index < lines.length - 1
        ? Number(lines[index + 1].dataset.at)
        : 22500;

    introTimers.push(
      setTimeout(() => {
        line.classList.remove("show");
        line.classList.add("hide");
      }, Math.max(at + 3000, next - 900))
    );
  });

  introTimers.push(
    setTimeout(() => {
      discoverButton.classList.add("show");

      setTimeout(() => {
        discoverButton.classList.add("ready");
      }, 1600);
    }, 22500)
  );
}

function clearIntroTimers() {
  introTimers.forEach(clearTimeout);
  introTimers = [];
}

/* HANGERŐ FINOM ÁTMENETE */

function fadeMusicTo(targetVolume, duration) {
  if (musicFadeTimer) {
    clearInterval(musicFadeTimer);
  }

  const startVolume = music.volume;
  const steps = 45;
  const interval = duration / steps;

  let step = 0;

  musicFadeTimer = setInterval(() => {
    step += 1;

    const progress = step / steps;

    music.volume = Math.max(
      0,
      Math.min(
        1,
        startVolume + (targetVolume - startVolume) * progress
      )
    );

    if (step >= steps) {
      music.volume = targetVolume;
      clearInterval(musicFadeTimer);
      musicFadeTimer = null;
    }
  }, interval);
}

/* ARANY RÉSZECSKÉK A LÁDÁBÓL */

function createSparks() {
  sparkLayer.innerHTML = "";

  for (let i = 0; i < 42; i += 1) {
    const spark = document.createElement("span");

    spark.className = "spark";

    spark.style.setProperty(
      "--s",
      `${1.5 + Math.random() * 3.8}px`
    );

    spark.style.setProperty(
      "--d",
      `${2.8 + Math.random() * 2.8}s`
    );

    spark.style.setProperty(
      "--delay",
      `${Math.random() * 1.15}s`
    );

    spark.style.setProperty(
      "--x",
      `${-120 + Math.random() * 240}px`
    );

    spark.style.setProperty(
      "--y",
      `${-70 - Math.random() * 180}px`
    );

    sparkLayer.appendChild(spark);

    setTimeout(() => {
      spark.remove();
    }, 6500);
  }
}

/* HÁTTÉR ARANYPOR */

const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let dust = [];

function resize() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = innerWidth * dpr;
  canvas.height = innerHeight * dpr;

  canvas.style.width = `${innerWidth}px`;
  canvas.style.height = `${innerHeight}px`;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  dust = Array.from(
    {
      length: Math.max(30, Math.floor(innerWidth / 18)),
    },
    () => ({
      x: Math.random() * innerWidth,
      y: Math.random() * innerHeight,
      r: 0.4 + Math.random() * 1.35,
      vx: -0.04 + Math.random() * 0.08,
      vy: -0.1 - Math.random() * 0.18,
      a: 0.06 + Math.random() * 0.28,
      t: Math.random() * Math.PI * 2,
    })
  );
}

function draw(time = 0) {
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  const vignette = ctx.createRadialGradient(
    innerWidth * 0.5,
    innerHeight * 0.42,
    0,
    innerWidth * 0.5,
    innerHeight * 0.42,
    Math.max(innerWidth, innerHeight) * 0.72
  );

  vignette.addColorStop(0, "rgba(217,179,91,.05)");
  vignette.addColorStop(0.5, "rgba(10,8,4,.02)");
  vignette.addColorStop(1, "rgba(0,0,0,.62)");

  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, innerWidth, innerHeight);

  dust.forEach((particle) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    if (particle.y < -8) {
      particle.y = innerHeight + 8;
      particle.x = Math.random() * innerWidth;
    }

    if (particle.x < -8) {
      particle.x = innerWidth + 8;
    }

    if (particle.x > innerWidth + 8) {
      particle.x = -8;
    }

    const pulse =
      0.55 + Math.sin(time * 0.0016 + particle.t) * 0.45;

    const alpha = particle.a * pulse;

    ctx.beginPath();
    ctx.arc(
      particle.x,
      particle.y,
      particle.r,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = `rgba(243,215,124,${alpha})`;
    ctx.shadowBlur = 7;
    ctx.shadowColor = `rgba(217,179,91,${alpha})`;

    ctx.fill();

    ctx.shadowBlur = 0;
  });

  requestAnimationFrame(draw);
}

window.addEventListener("resize", resize);

resize();
requestAnimationFrame(draw);
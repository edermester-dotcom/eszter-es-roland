const messages = [
    "Vannak pillanatok...",
    "...amelyek örökre megváltoztatják az életünket.",
    "2026. július 31.",
    "Eszter és Roland",
    "Ma egy új történet kezdődik...",
    "...egy közös történet."
];

let current = 0;

function start() {

    const main = document.querySelector("main");

    main.innerHTML = `
        <div id="story"></div>
    `;

    showNext();
}

function showNext(){

    const story = document.getElementById("story");

    if(current >= messages.length){

        showButton();
        return;
    }

    const p = document.createElement("p");
    p.className="storyLine";
    p.innerHTML=messages[current];

    story.appendChild(p);

    setTimeout(()=>{
        p.classList.add("visible");
    },100);

    current++;

    setTimeout(showNext,4500);

}

function showButton(){

    const story=document.getElementById("story");

    const btn=document.createElement("button");

    btn.innerHTML="Induljon a történet";

    btn.onclick=openChest;

    btn.className="nextButton";

    story.appendChild(btn);

    setTimeout(()=>{
        btn.classList.add("visible");
    },300);

}

function openChest(){

    document.body.innerHTML=`

<div class="chestScene">

<div class="glow"></div>

<div class="chest">

🧰

</div>

<h2>

A legnagyobb kincset már megtaláltátok.

</h2>

<p>

Egymásban.

</p>

<button onclick="openGift()">

Nyissátok ki a ládát

</button>

</div>

`;

}

function openGift(){

    const chest=document.querySelector(".chest");

    chest.style.transform="scale(1.15) rotate(-4deg)";

    chest.innerHTML="📦";

    createHearts();

}

function createHearts(){

    for(let i=0;i<25;i++){

        setTimeout(()=>{

            const h=document.createElement("div");

            h.className="heart";

            h.innerHTML="💛";

            h.style.left=Math.random()*100+"vw";

            h.style.animationDuration=(4+Math.random()*3)+"s";

            document.body.appendChild(h);

        },i*180);

    }

}
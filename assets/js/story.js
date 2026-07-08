const texts = document.querySelectorAll(".story p");

let index = 0;

function showNext() {

    if(index < texts.length){

        texts[index].classList.add("visible");

        index++;

        setTimeout(showNext,4500);

    }else{

        document.getElementById("nextButton").style.opacity=1;

    }

}

window.onload=()=>{

    setTimeout(showNext,2500);

};

document.getElementById("nextButton").onclick=()=>{

    window.location.href="chest.html";

};

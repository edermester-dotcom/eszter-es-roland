const button = document.getElementById("startButton");

button.addEventListener("click", () => {

    document.body.style.transition = "opacity 2s";

    document.body.style.opacity = "0";

    setTimeout(() => {

        alert("Itt kezdődik majd a történet következő fejezete.\n\n(Ezt a következő lépésben készítjük el.)");

        document.body.style.opacity = "1";

    }, 2000);

});

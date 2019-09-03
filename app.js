window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");
    let pickedColor;
    let setLineWidth;
    let dotActive;

    canvas.height = 600;
    canvas.width = 800;

    let drawing = false;
    let erazerStyle = false;
    let crayonStyle = false;
    let penStyle = false;

    function setStyle() {
        if (erazerStyle) {
            ctx.strokeStyle = "#f4f4f4";
            ctx.lineWidth = setLineWidth;
            ctx.globalAlpha = 1;

        } else if (crayonStyle) {
            ctx.strokeStyle = pickedColor;
            ctx.lineWidth = setLineWidth;
            ctx.globalAlpha = opacityValue.value;
        } else if (penStyle) {
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
            ctx.globalAlpha = 1;
        } else {
            ctx.strokeStyle = "#ffff03";
            ctx.lineWidth = 5;
            ctx.globalAlpha = 1;
        }
    };


    function startDrawing() {
        setStyle();
        drawing = true;
    };

    function stopDrawing() {
        drawing = false;
        ctx.beginPath();
    };

    const crayonlist = document.querySelector(".crayonlist");
    crayonlist.addEventListener("click", function (e) {
        crayonStyle = true;
        erazerStyle = false;
        penStyle = false;
        canvas.style.cursor = "url(coverage/cursor-crayon.png), auto";
        let li = e.target.closest('li');
        pickedColor = li.getAttribute('name');
        if (!li) return;
        if (!crayonlist.contains(li)) return;
        let allCrayons = document.querySelectorAll(".crayon");
        for (i = 0; i < allCrayons.length; i++) {
            allCrayons[i].classList.remove("crayon_active");
        };
        li.classList.add("crayon_active");
    });

    const erazer = document.querySelector("#erazer");
    erazer.addEventListener("click", erazeTool);

    function erazeTool() {
        erazerStyle = true;
        crayonStyle = false;
        penStyle = false;
        canvas.style.cursor = "url(coverage/cursor-erazer.png), auto";
    };


    const pen = document.querySelector("#pen");
    pen.addEventListener("click", penTool);

    function penTool() {
        penStyle = true;
        erazerStyle = false;
        crayonStyle = false;
        canvas.style.cursor = "url(coverage/cursor-pen.png ), auto";
    };

    let dots = document.querySelectorAll(".dot_item");
    for (i = 0; i < dots.length; i++) {
        dots[i].addEventListener("click", function (e) {
            let allDots = document.querySelectorAll(".dots > *");
            for (i = 0; i < allDots.length; i++) {
                allDots[i].classList.remove("dot_active");
            };
            if (e.target.className === "dot_item") {
                dotActive = e.target;
                setLineWidth = e.target.getAttribute("name");
                dotActive.classList.add("dot_active");
            }
        });
    };

    const opacityValue = document.querySelector(".opacity_range");
    opacityValue.addEventListener("change", setOpacity);

    function setOpacity() {
        ctx.globalAlpha = setOpacity.value;
    };

    const loadImage = document.querySelector("#load_image");
    loadImage.addEventListener("click", newImage);

    function newImage() {
        let base_image = new Image();
        let randomImage = Math.floor(Math.random() * 9) + 1;
        ctx.globalAlpha = 1;
        base_image.src = 'img/img' + randomImage + '.png';
        base_image.onload = function () {
            ctx.clearRect(0, 0, 800, 600);
            ctx.drawImage(base_image, 0, 0, 800, 600);
        }
    }




    const button = document.getElementById('save_image');
    button.addEventListener('click', function (e) {
        let dataURL = canvas.toDataURL('image/png');
        button.href = dataURL;
    });

    const clean = document.querySelector("#clean_image");
    clean.addEventListener("click", resetAll);

    function resetAll() {
        ctx.clearRect(0, 0, 800, 600);
    };

    function getMousePos(canvas, e) {
        let rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    };

    function draw(e) {
        if (!drawing) return;
        let pos = getMousePos(canvas, e);
        ctx.lineCap = "round";
        ctx.lineTo(pos.x, pos.y + 30);
        ctx.globalAlpha = opacityValue;
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y + 30);
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);
});

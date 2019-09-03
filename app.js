window.addEventListener("load", () => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var pickedColor;
    var setLineWidth;
    var dotActive;
    var opacity;
    let set_opacity;

    canvas.height = 600;
    canvas.width = 800;

    var drawing = false;
    var erazerStyle = false;
    var crayonStyle = false;
    var penStyle = false;



    function setStyle() {
        if (erazerStyle) {
            ctx.strokeStyle = "#f4f4f4";
            ctx.lineWidth = setLineWidth;
            ctx.globalAlpha = 1;

        } else if (crayonStyle) {
            ctx.strokeStyle = pickedColor;
            ctx.lineWidth = setLineWidth;
            ctx.globalAlpha = 1;
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

    //active crayon add class
    var crayonlist = document.querySelector(".crayonlist");
    crayonlist.addEventListener("click", function (e) {
        crayonStyle = true;
        erazerStyle = false;
        penStyle = false;
        canvas.style.cursor = "url(coverage/cursor-crayon.png), auto";
        console.log("crayontool");
        var li = e.target.closest('li');
        pickedColor = li.getAttribute('name');
        if (!li) return;
        if (!crayonlist.contains(li)) return;
        var allCrayons = document.querySelectorAll(".crayon");
        for (i = 0; i < allCrayons.length; i++) {
            allCrayons[i].classList.remove("crayon_active");
        };
        li.classList.add("crayon_active");
    });

    //    erazer
    var erazer = document.querySelector("#erazer");
    erazer.addEventListener("click", erazeTool);

    function erazeTool() {
        erazerStyle = true;
        crayonStyle = false;
        penStyle = false;
        canvas.style.cursor = "url(coverage/cursor-erazer.png), auto";
    };

    // pencil
    var pen = document.querySelector("#pen");
    pen.addEventListener("click", penTool);

    function penTool() {
        penStyle = true;
        erazerStyle = false;
        crayonStyle = false;
        canvas.style.cursor = "url(coverage/cursor-pen.png ), auto";
    };

    var dots = document.querySelector(".dots");
    dots.addEventListener("click", function (e) {
        var allDots = document.querySelectorAll(".dots > *");
        for (i = 0; i < allDots.length; i++) {
            allDots[i].classList.remove("dot_active");
        };

        dotActive = e.target;

        setLineWidth = e.target.className;
        dotActive.classList.add("dot_active");
    });

    var opacity_btn = document.querySelector(".opacity_range");
    opacity_btn.addEventListener("change", function (e) {
        //        var allDots = document.querySelectorAll(".dots > *");
        //        for (i = 0; i < allDots.length; i++) {
        //            allDots[i].classList.remove("dot_active");
        //        };

        opacity = document.getElementById("opacity_btn").value;

        //        set_opacity = opacity.target.getAttribute('id');
        console.log(opacity);
    });




    // load image to colorize
    var loadImage = document.querySelector("#load_image");
    loadImage.addEventListener("click", newImage);

    function newImage() {
        var base_image = new Image();
        var randomImage = Math.floor(Math.random() * 9) + 1;

        base_image.src = 'img/img' + randomImage + '.png';
        base_image.onload = function () {
            ctx.clearRect(0, 0, 800, 600);
            ctx.drawImage(base_image, 0, 0, 800, 600);
            ctx.globalAlpha = 1;

        }
    }



    //save image
    var button = document.getElementById('save_image');
    button.addEventListener('click', function (e) {
        var dataURL = canvas.toDataURL('image/png');
        button.href = dataURL;
    });

    //clean canvas   
    var clean = document.querySelector("#clean_image");
    clean.addEventListener("click", resetAll);

    function resetAll() {
        ctx.clearRect(0, 0, 800, 600);
    };

    function getMousePos(canvas, e) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    function draw(e) {
        if (!drawing) return;

        var pos = getMousePos(canvas, e);

        ctx.lineCap = "round";
        ctx.lineTo(pos.x, pos.y + 30);
        ctx.globalAlpha = 1;

        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y + 30);





    };


    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);

});

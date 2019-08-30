window.addEventListener("load", () => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var pickedColor;
    var setLineWidth;

    canvas.height = 400;
    canvas.width = 600;

    var drawing = false;
    var erazerStyle = false;
    var crayonStyle = false;
    var penStyle = false;



    function setStyle() {
        if (erazerStyle) {
            ctx.strokeStyle = "#f0efef";
            ctx.lineWidth = setLineWidth;
        } else if (crayonStyle) {
            ctx.strokeStyle = pickedColor;
            ctx.lineWidth = setLineWidth;
        } else if (penStyle) {
            ctx.strokeStyle = "#000000";
            ctx.lineWidth = 1;
        } else {
            ctx.strokeStyle = "#ffff03";
            ctx.lineWidth = 5;
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
        canvas.style.cursor = "url(/coverage/cursor-crayon.png), auto";
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
        canvas.style.cursor = "url(/coverage/cursor-erazer.png), auto";
    };

    // pencil
    var pen = document.querySelector("#pen");
    pen.addEventListener("click", penTool);

    function penTool() {
        penStyle = true;
        erazerStyle = false;
        crayonStyle = false;
        canvas.style.cursor = "url(/coverage/cursor-pen.png ), auto";
    };

    var dots = document.querySelector(".dots");
    dots.addEventListener("click", function (e) {
        setLineWidth = e.target.className;
    });

    // load image to colorize
    var loadImage = document.querySelector("#load_image");
    loadImage.addEventListener("click", newImage);

    function newImage() {
        var base_image = new Image();
        var randomImage = Math.floor(Math.random() * 9) + 1;

        base_image.src = 'img/img' + randomImage + '.png';
        base_image.onload = function () {
            ctx.clearRect(0, 0, 600, 400);
            ctx.drawImage(base_image, 0, 0, 600, 400);
//            ctx.globalAlpha = 1;
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
        ctx.clearRect(0, 0, 600, 400);
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
        //        var mouseX = e.pageX - this.offsetLeft;
        //        var mouseY = e.pageY - this.offsetTop;
var pos =getMousePos(canvas, e);
        
        ctx.lineCap = "round";
        ctx.lineTo(pos.x, pos.y + 25);
        //        ctx.lineTo(mouseX, mouseY + 23);

        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(pos.x, pos.y + 25);
        //        ctx.moveTo(mouseX, mouseY + 23);




    };


    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);

});

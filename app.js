window.addEventListener("load", () => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    canvas.height = 400;
    canvas.width = 600;

    var drawing = false;
    var erazerStyle = false;

    function startDrawing() {
        drawing = true;
    };

    function stopDrawing() {
        drawing = false;
        ctx.beginPath();
    };

    //active crayon add class


    var crayonlist = document.getElementById("crayonlist");

    crayonlist.addEventListener("click", function (e) {

        let li = e.target.closest('li'); 
        if (!li) return; 
        if (!crayonlist.contains(li)) return;

        var qqq = document.querySelectorAll(".crayon");

        for(i=0; i < qqq.length; i++) {
            console.log(qqq[i])
           qqq[i].classList.remove("crayon_active");
        };
        
        li.classList.add("crayon_active");

    });

    
    
    

    //    erazer
    var erazer = document.querySelector("#erazer");
    erazer.addEventListener("click", erazeTool);

    function erazeTool() {
        erazerStyle = true;
        ctx.strokeStyle = "#f0efef";
    };

    // pencil
    var pencil = document.querySelector("#pencil");
    pencil.addEventListener("click", pencilTool);

    function pencilTool() {
        pencilStyle = true;
        ctx.strokeStyle = "#ff0000";
    };


    //////////////////////////////////////////////////////////////////////////////////////////
    //set color
    var colorLine = document.querySelector("#choosecolor");
    colorLine.addEventListener("change", setColor);

//    function setColor() {
//        if (erazerStyle == true) {
//            ctx.strokeStyle = "#fff";
//        } else if (pencilStyle == true) {
//            ctx.strokeStyle = colorLine.value;
//        } else if (crayonStyle == true) {
//            ctx.strokeStyle = "#00ff00"
//            ctx.lineWidth = 5;
//        }
//    };

    //set linewidth
    var lineWidth = document.querySelector("#lineWight");
    lineWidth.addEventListener("change", setLineWight);

    function setLineWight() {
        ctx.lineWidth = lineWidth.value;
    }

    // load image to colorize
    var loadImage = document.querySelector("#loadImage");
    loadImage.addEventListener("click", newImage)

    function newImage() {
        var base_image = new Image();
        var randomImage = Math.floor(Math.random() * 3) + 1;
        base_image.src = 'img/img' + randomImage + '.png';
        base_image.onload = function () {
            ctx.clearRect(0, 0, 600, 400);
            ctx.drawImage(base_image, 0, 0, 600, 400);
        }
    }

    //set linetype

    //save image
    //var canvas = document.getElementById("myCanvas");
    window.open(canvas.toDataURL("image/png"));

    //clean canvas   
    var clean = document.querySelector("#clean");
    clean.addEventListener("click", resetAll);

    function resetAll() {
        ctx.clearRect(0, 0, 600, 400);
    };



    function draw(e) {
        if (!drawing) return;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX - 15, e.clientY - 15);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - 15, e.clientY - 15);
        //ctx.strokeStyle = "rgba (0,0,20,1)";
        //ctx.strokeStyle = colorLine.value;
        ctx.lineWidth = lineWidth.value;
        //ctx.drawImage(base_image, 0, 0, 600, 400);

    }


    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);

});

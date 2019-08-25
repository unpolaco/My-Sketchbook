window.addEventListener("load", () => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    let pickedColor;

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


    var crayonlist = document.querySelector(".crayonlist");
    
    crayonlist.addEventListener("click", function (e) {

        var li = e.target.closest('li'); 
        console.log(li);        
        pickedColor = li.getAttribute('name');

        if (!li) return; 
        if (!crayonlist.contains(li)) return;

        var allCrayons = document.querySelectorAll(".crayon");

        for(i=0; i < allCrayons.length; i++) {
            
           allCrayons[i].classList.remove("crayon_active");
        };
        
        li.classList.add("crayon_active");
        
        
    });

    
    
    

    //    erazer
    var erazer = document.querySelector("#erazer");
    erazer.addEventListener("click", erazeTool);

    function erazeTool() {
        erazerStyle = true;
        ctx.strokeStyle = "#d61111";
    };

    // pencil
    var pen = document.querySelector("#pen");
    pen.addEventListener("click", penTool);

    function penTool() {
        penStyle = true;
        ctx.strokeStyle = "#000000";
        //ctx.lineWidth = 1;
    };
    
///lineWidth
    
        if (penTool = true) {
            ctx.lineWidth = 1;
        } else {
            ctx.lineWidth = lineWidth.value;
        };
    //////////////////////////////////////////////////////////////////////////////////////////
    //set color
//    var colorLine = document.querySelector("#choosecolor");
//    colorLine.addEventListener("change", setColor);
    
//    function setColor() {
//        if (erazerStyle == true) {
//            ctx.strokeStyle = "#c61a1a";
//        } else if (pencilStyle == true) {
//            ctx.strokeStyle = "#000000";
//            ctx.lineWidth = 1;
//        } else if (crayonStyle == true) {
//            ctx.strokeStyle = "#00ff00"
//            ctx.lineWidth = 5;
//        }
//    };

    //set linewidth
    var lineWidth = document.querySelector("#lineWidth");
    lineWidth.addEventListener("change", setLineWidth);

    function setLineWidth() {
        ctx.lineWidth = lineWidth.value;
    }

    // load image to colorize
    var loadImage = document.querySelector("#bulb");
    loadImage.addEventListener("click", newImage);

    function newImage() {
        var base_image = new Image();
        var randomImage = Math.floor(Math.random() * 3) + 1;
        base_image.src = 'img/img' + randomImage + '.png';
        base_image.onload = function () {
            ctx.clearRect(0, 0, 600, 400);
            ctx.drawImage(base_image, 0, 0, 600, 400);
        }
    }

    

    //save image
    //var canvas = document.getElementById("myCanvas");
    window.open(canvas.toDataURL("image/png"));

    //clean canvas   
    var clean = document.querySelector("#trash");
    clean.addEventListener("click", resetAll);

    function resetAll() {
        ctx.clearRect(0, 0, 600, 400);
    };



    function draw(e) {
        if (!drawing) return;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX -150, e.clientY -110);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX -150, e.clientY -110);
        ctx.strokeStyle = pickedColor;
        //ctx.strokeStyle = colorLine.value;
        
        //ctx.drawImage(base_image, 0, 0, 600, 400);

        

    };


    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);

});

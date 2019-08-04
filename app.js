window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    canvas.height = 400; //window.innerHeight;
    canvas.width = 600; //window.innerWidth;

    var drawing = false;

    function startDrawing() {
        drawing = true;
    };

    function stopDrawing() {
        drawing = false;
        ctx.beginPath();
    };

    //set color
    var colorLine = document.querySelector("#choosecolor");
    colorLine.addEventListener("change", setColor);

    function setColor() {
        // czemu w console.log nie wywala mi odpowiedniej wartosci?
        console.log(colorLine);
        ctx.strokeStyle = colorLine.value;
    };

    //set linewidth
    var lineWidth = document.querySelector("#lineWight");
    lineWidth.addEventListener("change", setLineWight);

    function setLineWight() {
        console.log(lineWight.value);
        ctx.lineWidth = lineWidth.value;
    }


//continous line
//var oneLine = document.querySelector("oneLine");
//function drawOneLine() {
//    
//}



// load image to colorize
var loadImage = document.querySelector("#loadImage");
loadImage.addEventListener("click", newImage)

function newImage()
{
  base_image = new Image();
//dodac randomowy obraz
  base_image.src = 'img/img2.jpg';
  base_image.onload = function(){
    ctx.drawImage(base_image, 0, 0, 600, 400);
  }
}
//erazer

//set linetype

//set cursor

//clean canvas   

//continous line
//var oneLine = document.querySelector("oneLine");
//function drawOneLine() {
//    
//}


    function draw(e) {
        if (!drawing) return;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        ctx.strokeStyle = colorLine.value;
        ctx.lineWidth = lineWidth.value;
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);

});

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

    function newImage() {
        base_image = new Image();
        //dodac randomowy obraz
        var randomImage = Math.floor(Math.random() * 3) + 1;
        base_image.src = 'img/img' + randomImage + '.png';
        base_image.onload = function () {
            ctx.clearRect(0, 0, 600, 400);
            ctx.drawImage(base_image, 0, 0, 600, 400);


            //      document.querySelector('.btn-roll').addEventListener('click', function() {
            //    if(gamePlaying) {
            //        // 1. Random number
            //        var dice1 = Math.floor(Math.random() * 6) + 1;
            //        var dice2 = Math.floor(Math.random() * 6) + 1;
            //
            //        //2. Display the result
            //        document.getElementById('dice-1').style.display = 'block';
            //        document.getElementById('dice-2').style.display = 'block';
            //        document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
            //        document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';
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
        //ctx.strokeStyle = "rgba (0,0,20,1)";
        ctx.strokeStyle = colorLine.value;
        ctx.lineWidth = lineWidth.value;
        //draw image after drawing
        ctx.drawImage(base_image, 0, 0, 600, 400);

    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);

});

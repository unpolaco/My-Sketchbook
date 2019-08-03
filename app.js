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

    
    
    function draw(e) {
        if (!drawing) return;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
        ctx.strokeStyle = colorLine.value;
    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);

});

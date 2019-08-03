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
    

    function draw(e) {
        if (!drawing) return;
        ctx.lineCap = "round";
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);

    };

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mousemove", draw);

});









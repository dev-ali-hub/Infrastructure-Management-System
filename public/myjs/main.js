window.onload = function() {

    setTimeout(function() {
        location.reload();
    }, 5000);
    const myCanvas = document.getElementById("mycanvas");
    let data = {};
    getData();
    if (data.source === "Ln-Br") {
        $("#myModal").modal("show");
    }
    console.log("logging");

    myCanvas.width = 1100;
    myCanvas.height = (480);

    let context = myCanvas.getContext("2d");
    context.fillStyle = "red";
    context.font = "12pt Arial Bold";
    context.imageSmoothingEnabled = false;
    let imageObjects = [];


    window.addEventListener("resize", function() {
        context.font = "12pt Arial Bold";
        myCanvas.height = (480);
        for (let i = 0; i < imageObjects.length; i++) {
            context.fillStyle = "red";
            context.font = "12pt Arial Bold";
            /* imageObjects[i].draw();*/
            imageObjects[i].write();
        }
        drawLines();
        writeValues();
    });




    function ImageObject(x, y, src, label, lx, ly) {
        this.x = x;
        this.y = y;
        this.label = label;
        this.lx = lx;
        this.ly = ly;
        this.image = new Image();
        this.image.src = src;
        this.image.onload = () => {
            context.drawImage(this.image, this.x, this.y, 100, 100);
        };
        this.write = function() {

            context.fillText(this.label, this.lx, this.ly);

        }

    }

    const poleX = 180;
    const poleY = 15;
    let poleObject = new ImageObject(poleX, poleY, "../images/pole3.png", "IESCO", 195, 150);


    const gen1X = 185;
    const gen1Y = 170;
    let gen1Object = new ImageObject(gen1X, gen1Y, "../images/gen1.png", "Gen-1", 200, 283);


    const gen2X = 185;
    const gen2Y = 300;
    let gen2Object = new ImageObject(gen2X, gen2Y, "../images/gen2.png", "Gen-2", 200, 415);

    const sw1X = 365;
    const sw1Y = 80;
    let switch1Object;
    const sw2X = 495;
    const sw2Y = 267;
    let switch2Object;


    if (data.source === "IESCO" || data.source === "GEN1") {

        switch1Object = new ImageObject(sw1X, sw1Y, "../images/Switch Up.png", "", 0, 0);
        switch2Object = new ImageObject(sw2X, sw2Y, "../images/Switch Up.png", "", 0, 0);
    } else if (data.source === "GEN2") {
        switch1Object = new ImageObject(sw1X, sw1Y, "../images/Switch Down.png", "", 0, 0);
        switch2Object = new ImageObject(sw2X, sw2Y, "../images/Switch Down.png", "", 0, 0);
    } else if (data.source === "Ln-Br") {
        switch1Object = new ImageObject(sw1X, sw1Y, "../images/Switch Br.png", "", 0, 0);
        switch2Object = new ImageObject(sw2X, sw2Y, "../images/Switch Br.png", "", 0, 0);
    }


    imageObjects.push(poleObject, gen1Object, gen2Object, switch1Object, switch2Object);

    for (let i = 0; i < imageObjects.length; i++) {
        imageObjects[i].write();
    }
    drawLines();



    function drawLines() {

        if (data.source === "IESCO") {
            context.strokeStyle = "green";
        } else {
            context.strokeStyle = "grey";
        }
        context.beginPath();
        let line1X = 265;
        let line1Y = 70;
        context.moveTo(line1X, line1Y);
        context.lineTo(315, 70);
        context.lineWidth = 5;
        context.lineTo(315, 99);
        context.lineTo(375, 99);
        context.stroke();

        if (data.source === "GEN1") {
            context.strokeStyle = "green";
        } else {
            context.strokeStyle = "grey";
        }
        context.closePath();
        context.beginPath();
        let line2X = 265;
        let line2Y = 217;
        context.moveTo(line2X, line2Y);
        context.lineTo(315, 218);
        context.lineTo(315, 161);
        context.lineTo(375, 161);
        context.stroke();


        if (data.source === "GEN2") {
            context.strokeStyle = "green";
        } else {
            context.strokeStyle = "grey";
        }
        let line3X = 265;
        let line3Y = 348;
        context.closePath();
        context.beginPath();
        context.moveTo(line3X, line3Y);
        context.lineTo(505, 348);
        context.stroke();

        if (data.source === "IESCO" || data.source === "GEN1") {
            context.strokeStyle = "green";
        } else {
            context.strokeStyle = "grey";
        }
        context.closePath();
        context.beginPath();
        let line4X = 458;
        let line4Y = 129;
        context.moveTo(line4X, line4Y);
        context.lineTo(485, 129);
        context.lineTo(485, 285);
        context.lineTo(505, 285);
        context.stroke();


        if (data.source === "Ln-Br") {
            context.strokeStyle = "grey";
        } else {
            context.strokeStyle = "green";
        }
        context.closePath();
        context.beginPath();
        let line5X = 587;
        let line5Y = 317;
        context.moveTo(line5X, line5Y);
        context.lineTo(650, 317);
        context.lineTo(650, 140);
        context.lineTo(685, 140);
        context.stroke();


        let rectX = 685;
        let rectY = 110;

        context.strokeStyle = "purple";
        context.closePath();
        context.strokeRect(rectX, rectY, 180, 320);

        let dcX = 732;
        let dxY = 130;
        context.fillText("Data Centre", dcX, dxY);

    }

    writeValues();

    function getData() {

        data.source = document.getElementById("source").innerText;
        data.phase1 = document.getElementById("phase1").innerText;
        data.phase2 = document.getElementById("phase2").innerText;
        data.phase3 = document.getElementById("phase3").innerText;
        data.ups = document.getElementById("ups").innerText;
        data.floor = document.getElementById("floor").innerText;
        data.temp = document.getElementById("temp").innerText;
        data.humidity = document.getElementById("hum").innerText;
        data.date = document.getElementById("date").innerText;
        data.time = document.getElementById("time").innerText;

        console.log(JSON.stringify(data));

    }


    function writeValues() {

        writeText("Phase1:", 705, 165, "red");
        writeText(data.phase1, 755, 165, "black");
        writeText("Phase2:", 705, 185, "red");
        writeText(data.phase2, 755, 185, "black");
        writeText("Phase3:", 705, 205, "red");
        writeText(data.phase3, 755, 205, "black");
        writeText("UPS:", 705, 225, "red");
        writeText(data.ups, 755, 225, "black");
        writeText("Floor", 705, 245, "red");
        writeText(data.floor, 755, 245, "black");
        writeText("Temp", 705, 265, "red");
        writeText(data.temp, 755, 265, "black");
        writeText("Humid:", 705, 285, "red");
        writeText(data.humidity, 755, 285, "black");
        writeText("Date:", 705, 305, "red");
        writeText(data.date, 755, 305, "black");
        writeText("Time", 705, 325, "red");
        writeText(data.time, 755, 325, "black");
        context.font = "22pt Aerial";
        writeText("Source:", 20, 60, "red");
        writeText(data.source, 110, 60, "black");

    }

    function writeText(string, x, y, color) {
        context.fillStyle = color;
        context.fillText(string, x, y);
    }


};
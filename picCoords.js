var xCoords = [];
var yCoords = [];

var myImg = document.getElementById("sal1");
var canvas = document.createElement("canvas");

function setCanvas(e){
    var height = myImg.height;
    var width = myImg.width;
    
    canvas.id = "myCanvas";
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = "absolute";
    canvas.style.right = 10;
    canvas.style.top = 10;
    canvas.style.border = "1px solid";

    var context = canvas.getContext("2d");
    context.drawImage(myImg, 0, 0);

    canvas.addEventListener("click", getCoordinates);

    document.body.appendChild(canvas);
    // var ctx = canvas.getContext("2d");
    // ctx.moveTo(0, 0);
    // ctx.lineTo(200, 100);
    // ctx.strokeStyle = "rgb(255, 0, 0)";
    // ctx.stroke();

}

function clearArray(){

    var textWords = document.getElementsByClassName("text");
    textWords[0].innerHTML = "";

    xCoords = [];
    yCoords = [];

    var context = canvas.getContext("2d");
    context.clearRect(0, 0, myImg.width, myImg.height);

    myImg = new Image();
    myImg.src = "Images/salamander1.jpg"

    //context.drawImage(myImg, 0, 0);

}

function drawLine(e){

    var length = xCoords.length;

    if (length > 1){
        var x = xCoords[length - 2];
        var y = yCoords[length - 2];
        console.log("first x: " + x);
        console.log("first y: " + y);

        var ctx = canvas.getContext("2d");
        ctx.moveTo(x, y);

        x = xCoords[length - 1];
        y = yCoords[length - 1];
        console.log("second x: " + x);
        console.log("second y: " + y);

        ctx.lineTo(x, y);
        ctx.strokeStyle = "rgb(255, 255, 255)";
        ctx.stroke();

    }

}

function findPosition(oElement){
    if(typeof( oElement.offsetParent ) != "undefined"){
        for(var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent){
            posX += oElement.offsetLeft;
            posY += oElement.offsetTop;
        }
        return [ posX, posY ];
    }
    else{
        return [ oElement.x, oElement.y ];
    }
}

function getCoordinates(e){

   // console.log("HI");

    var PosX = 0;
    var PosY = 0;
    var ImgPos;
    ImgPos = findPosition(myImg);
    if (!e) var e = window.event;
    if (e.pageX || e.pageY){
        PosX = e.pageX;
        PosY = e.pageY;
    }
    else if (e.clientX || e.clientY){
        PosX = e.clientX + document.body.scrollLeft
            + document.documentElement.scrollLeft;
        PosY = e.clientY + document.body.scrollTop
            + document.documentElement.scrollTop;
    }
    PosX = PosX - ImgPos[0];
    PosY = PosY - ImgPos[1];

    xCoords.push(PosX);
    yCoords.push(PosY);

    var h = document.createElement("H1");
    var newText = document.createTextNode("\nX: " + PosX + 
        " Y: " + PosY);
    h.appendChild(newText);

    var textWords = document.getElementsByClassName("text");
    textWords[0].appendChild(h);

    drawLine();

}
    
   // var h = document.createElement("H1");
   // var t = document.createTextNode("X: " + PosX + " Y: " + PosY);
   // h.style.fontSize = "20px";
   // h.appendChild(t);
   // document.body.appendChild(h);
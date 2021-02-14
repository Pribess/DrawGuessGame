let mode = "paint";
let color = "black";
let size = 2;

let painting = false;

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const resize = document.getElementById("resize");

const CANVAS_SIZE = 500;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = "black";
ctx.lineWidth = size;

document.getElementById("paint").style.border = "solid 3px black";
document.getElementById("black").style.border = "solid 3px black";

window.addEventListener("wheel", (event) => {
   const value = -1 * event.deltaY / 100;
   size += value
   if(size < 0) {
       size = 0;
   } else if (size > 50) {
       size = 50;
   }
   ctx.lineWidth = size;
   resize.value = size;
})

if (canvas) {
    canvas.addEventListener("mousemove", (event) => {
        const x = event.offsetX;
        const y = event.offsetY;

        if(!painting) {
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
     });
    canvas.addEventListener("mousedown", (event) => {
        if(mode == "fill") {
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        }
        painting = true;
    });
    canvas.addEventListener("mouseup", (event) => {
        painting = false;
    });
    canvas.addEventListener("mouseleave", (event) => {
        painting = false;
    })
}

if(resize) {
    resize.addEventListener("input", (event) => {
        const value = event.target.value;
        ctx.lineWidth = value;
    });
}

function selector(index) {
    reset(index);
    if(index == "paint" || index == "fill") {
        mode = index;
    } else {
        color = index;
    }
}

function reset(index) {
    if(index == "paint" || index == "fill") {
        document.getElementById("paint").style.border = "";
        document.getElementById("fill").style.border = "";
        mode = index;
    } else {
        document.getElementById("black").style.border = "";
        document.getElementById("white").style.border = "";
        document.getElementById("red").style.border = "";
        document.getElementById("orange").style.border = "";
        document.getElementById("yellow").style.border = "";
        document.getElementById("greenyellow").style.border = "";
        document.getElementById("skyblue").style.border = "";
        document.getElementById("blue").style.border = "";
        document.getElementById("purple").style.border = "";
        color = index;
    }

    ctx.strokeStyle = color;

    document.getElementById(index).style.border = "solid 3px black";
}
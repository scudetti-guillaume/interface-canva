import { Rectangle } from './rectangles.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const rectangles = [];
const excludedColors = []
let isDragging = false;

const resizeCanvas = () => {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  redrawRectangles();
}

const redrawRectangles = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  rectangles.forEach((rectangle) => rectangle.draw(context));
}


// donne une couleur aléatoire au rectangle 
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  const backgroundColor = getComputedStyle(canvas).backgroundColor;
  excludedColors.push(backgroundColor);
  let color = "#";
  for (let i = 0; i < 6; i++) {
    let randomLetter = letters[Math.floor(Math.random() * 16)];
    color += randomLetter;
  }
  if (excludedColors.includes(color)) {
    return getRandomColor();
  } else {
   excludedColors.push(color);
    return color;
  }
}

const startDragging = (event) => {

  const color = getRandomColor();
  const startX = event.offsetX;
  const startY = event.offsetY;
  const rectangle = new Rectangle(startX, startY, 0, 0, color);
  rectangles.push(rectangle);
  console.log(rectangles);
  isDragging = true;
}

const drag = (event) => {
  if (isDragging) {
    const rectangle = rectangles[rectangles.length - 1];
    rectangle.width = event.offsetX - rectangle.x;
    rectangle.height = event.offsetY - rectangle.y;
    redrawRectangles();
  }
}

const stopDragging = () => {
  isDragging = false;
}

canvas.addEventListener('mousedown', startDragging);
canvas.addEventListener('mousemove', drag);
canvas.addEventListener('mouseup', stopDragging);
canvas.addEventListener('mouseout', stopDragging);
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
import { Rectangle } from './rectangles.js';

const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const rectangles = [];
const excludedColors = []
let isDragging = false;
let doubleClickCheck = false;

// redimensionne le canva en fonction de la taille de la fenêtre
const resizeCanvas = () => {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  redrawRectangles();
}

// redessine les rectangles 
const redrawRectangles = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  rectangles.forEach((rectangle, index) => {
  // supprime du tableau ceux hors canvas
    if (rectangle.x < 0 || rectangle.y < 0 || rectangle.x + rectangle.width > canvas.width || rectangle.y + rectangle.height > canvas.height) {
      rectangles.splice(index, 1);
    } else {
      rectangle.draw(context);
    }
  });
};


// donne une couleur aléatoire au rectangle en excluant celle deja existante ou celle du backgroung
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

// demarre le dessin du rectangle
const startDragging = (event) => {
event.preventDefault();
    const color = getRandomColor();
    const startX = event.offsetX;
    const startY = event.offsetY;
    const rectangle = new Rectangle(startX, startY, 0, 0, color);
    rectangles.push(rectangle);
    isDragging = true;
    console.log(rectangles);
}

// assure le dessin du rectangle
const drag = (event) => {
  if (isDragging) {
    const rectangle = rectangles[rectangles.length - 1];
    rectangle.width = event.offsetX - rectangle.x;
    rectangle.height = event.offsetY - rectangle.y;
    redrawRectangles();
  }
}
// stop le dessin du rectangle
const stopDragging = () => {
  isDragging = false;
}

// check un double click
const handleDoubleClick = (event) => {
  event.preventDefault();
  doubleClickCheck = true
  // supprime du tableau les deux derniers rectangles creer dû au double click et redessine le tableau
  if (doubleClickCheck && rectangles.length >= 1) {
    rectangles.splice(rectangles.length - 2, 2);
    redrawRectangles();
  }
}


canvas.addEventListener('mousedown', startDragging);
canvas.addEventListener('mousemove', drag);
canvas.addEventListener('mouseup', stopDragging);
canvas.addEventListener('mouseout', stopDragging);
canvas.addEventListener('dblclick', handleDoubleClick);
window.addEventListener('resize', resizeCanvas);
resizeCanvas();
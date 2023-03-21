import { Rectangle } from "./rectangles.js";

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const btnRepaint = document.getElementById("button-color-pair");
const rectangles = [];
const excludedColors = [];
const notCompleteRotation = [];
let isDragging = false;
let doubleClickCheck = false;

// let isPaired = false;
//let colorPair = null; 
// let colorOriginal = null ;


// Redimensionne le canva en fonction de la taille de la fenêtre
const resizeCanvas = () => {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  redrawRectangles();
};

// Redessine les rectangles

const redrawRectangles = () => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  rectangles.forEach((rectangle, index) => {
    if (
      rectangle.x < 0 ||
      rectangle.y < 0 ||
      rectangle.x + rectangle.width > canvas.width ||
      rectangle.y + rectangle.height > canvas.height
      // ||(notCompleteRotation.length === 0 && rectangle.isSelected === true)
    ) {
      rectangles.splice(index, 1);
    } else {
      rectangle.draw(context);
    }
    // if(rectangle.isPaired)
    // {
    // rectangle.color = colorPair
    //   rectangle.draw(context);
    // }else{
    //   rectangle.color = colorOriginal
    //   rectangle.draw(context);
    // }

  });
};

// Donne une couleur aléatoire au rectangle en excluant celle deja existante ou celle du backgroung du canva

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
};

// Démarre le dessin du rectangle

const startDragging = (event) => {
  event.preventDefault();
  // let colorPair = null;
  // const colorOriginal = getRandomColor();
  const color = getRandomColor();
  // const color = isPaired ? colorPair : colorOriginal;
  const startX = event.offsetX;
  const startY = event.offsetY;
  const rectangle = new Rectangle(startX, startY, 0, 0, color, context);
  rectangles.push(rectangle);
  isDragging = true;
};

// Assure le dessin du rectangle
const drag = (event) => {
  if (isDragging) {
    const rectangle = rectangles[rectangles.length - 1];
    rectangle.width = event.offsetX - rectangle.x;
    rectangle.height = event.offsetY - rectangle.y;
    redrawRectangles();
  }
};

// Stop le dessin du rectangle
const stopDragging = () => {
  isDragging = false;
};

// Animation des rectangles au double click

const animationRectangle = (event) => {
  event.preventDefault();
  doubleClickCheck = true;
  const doubleClickX = event.offsetX;
  const doubleClickY = event.offsetY;
  let foundRectangle = null;
  // Supprime du tableau les deux derniers rectangles créés dû au double click et redessine le tableau
  if (doubleClickCheck && rectangles.length >= 2) {
    rectangles.splice(rectangles.length - 2, 2);
    rectangles.forEach((rectangle) => {
      if (
        doubleClickX >= rectangle.x &&
        doubleClickX <= rectangle.x + rectangle.width &&
        doubleClickY >= rectangle.y &&
        doubleClickY <= rectangle.y + rectangle.height
      ) {
      foundRectangle = rectangle
      }
    });
    // Si le double click est sur un rectangle
    if (foundRectangle) {
      // Tableau des rectangles en cour de rotation
      notCompleteRotation.push(foundRectangle);
      notCompleteRotation.forEach((rectangle)=>{rectangle.isAnimate = true})
      // L'animation du rectangle
      foundRectangle.animateRotation(redrawRectangles);
      const animate = () => {
        if (foundRectangle.rotation < foundRectangle.animationRotation) {
          requestAnimationFrame(animate);
        } else {
          // Condition pour que toutes les animations soit terminée avant suppression des rectangles
          notCompleteRotation.shift(); // Supression du tableau notCompleteRotation des rectangles ayant finis leur animation
          for (let i = rectangles.length - 1; i >= 0; i--) {
            // Supression du tableau rectangles des rectangles ayant finis leur animation
            if (
              notCompleteRotation.length === 0 && rectangles[i].isAnimate == true 
            ) {
              // Condition de vérification avant supression des rectangles
              rectangles.splice(i, 1);
            }
          }
        }
        redrawRectangles();
      };
      requestAnimationFrame(animate);
    }
  }
};

// Repeindre de la même couleur aléatoire les deux rectangles qui ont la plus petite différence d'aire

const repaint = () => {
  let minDiff = Number.MAX_VALUE;
  let sortRectangles = [];
  // Trie les rectangles par ordre croissant d'aire
  rectangles.sort((a, b) => a.getArea() - b.getArea());
  // Sélectionne la paire de rectangles ayant la plus petite différence d'aire
  for (let i = 0; i < rectangles.length - 1; i++) {
    const diff = rectangles[i + 1].getArea() - rectangles[i].getArea();
    if (diff < minDiff) {
      minDiff = diff;
      sortRectangles = [rectangles[i], rectangles[i + 1]];
      //  colorPair = getRandomColor();
    }
  }
  // Repeint les deux rectangles sélectionnés avec la même couleur aléatoire
  let colorPair = getRandomColor();
  sortRectangles.forEach((pairRectangle) => {
    pairRectangle.isPaired = true;
    pairRectangle.color = colorPair;
  });
  
  // Repeindre d'une couleur aléatoire les rectangles sortant de la conditon de l'aire

  // Tri les rectangles en dehors de la condition d'aire
  const sortNotPaired = rectangles.filter(rectangle => !sortRectangles.includes(rectangle))

  // Identification des rectangles sortant de la condition et recolorisation
  sortNotPaired.forEach((rectangle1, index1) => {
    sortNotPaired.forEach((rectangle2, index2) => {
      if (index1 !== index2 && rectangle1.color === rectangle2.color) {
        rectangle1.color = getRandomColor();
      }
    });
  });

  redrawRectangles();
};

window.addEventListener("resize", resizeCanvas);
canvas.addEventListener("mousedown", startDragging);
canvas.addEventListener("mousemove", drag);
canvas.addEventListener("mouseup", stopDragging);
canvas.addEventListener("mouseout", stopDragging);
canvas.addEventListener("dblclick", animationRectangle);
btnRepaint.addEventListener("click", repaint);

resizeCanvas();



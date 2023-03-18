var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

// Définissez les propriétés de votre rectangle
var x = 50;
var y = 50;
var width = 100;
var height = 50;

// Définissez l'angle initial de votre rectangle (en radians)
var angle = 0;

// Définissez une fonction pour dessiner et animer votre rectangle
function dessinerEtAnimer() {
    // Effacez le canvas avant de dessiner le rectangle
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Déplacez le point d'origine du contexte de dessin au centre du rectangle
    ctx.translate(x + width / 2, y + height / 2);

    // Faites pivoter le contexte de dessin de l'angle actuel
    ctx.rotate(angle);

    // Dessinez votre rectangle
    ctx.fillStyle = "blue";
    ctx.fillRect(-width / 2, -height / 2, width, height);

    // Faites pivoter l'angle de votre rectangle pour l'animation
    angle += Math.PI / 180;

    // Si l'angle atteint 360 degrés, arrêtez l'animation
    if (angle >= 2 * Math.PI) {
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    } else {
        // Sinon, continuez l'animation
        var animationId = requestAnimationFrame(dessinerEtAnimer);
    }
}

// Appelez la fonction pour dessiner et animer votre rectangle
dessinerEtAnimer();
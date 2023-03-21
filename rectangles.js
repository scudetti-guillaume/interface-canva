export class Rectangle {
    constructor(x, y, width, height, color,  context) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.area = width * height;
        this.color = color ;
        // this.originalColor = t
        // this.colorPair = colorPair;
        this.animationRotation = 360; // Rotation total de l'animation en degré
        this.animationDuration = 2000 // Durée de l'animation
        this.animationProgress = 0
        this.rotation = 0;
        this.context = context;
        this.isSelected = false;
        this.isPaired = false
    }
    
    
    getArea() {
        this.area = this.width * this.height;
        return this.area;
    }

    draw() {
        const { context } = this;
        context.save();
        context.fillStyle = this.isPaired  ? this.colorPair : this.color;
        context.fillStyle = this.color;
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate((this.rotation * Math.PI) / 180);
        context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
        context.restore(); 
    }

   
    animateRotation(redrawRectangles) {
        const { context } = this;
        const start = performance.now();
        const animate = (timestamp) => {
            this.animationProgress = timestamp - start;
            this.rotation = (this.animationProgress / this.animationDuration) * this.animationRotation;
            if (this.animationProgress < this.animationDuration) {
              context.clearRect(0, 0, context.canvas.width, context.canvas.height); 
                this.draw(); 
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
    
  
}


  // animateRotation(context, redrawRectangles, rectangles) {
    //     this.animationInProgress = true;
    //     const start = performance.now();
    //     // let animationCount = 0; // étape 1
    //     // this.animationEndDegree = this.animationRotationTotal; // Changez cette valeur pour modifier l'angle de rotation
    //     const animate = (timestamp) => {
    //         const elapsed = timestamp - start;
    //         this.animationProgress = elapsed / this.animationDuration;
    //         // this.animationProgress = (elapsed / this.animationDuration) * this.animationRotationTotal;
    //         if (this.animationProgress < 1) {
    //             this.rotationDegree = this.animationProgress * this.animationRotation;
    //             context.clearRect(this.x - this.width / 2, this.y - this.height / 2, this.width * 2, this.height * 2);
    //             this.draw(context);
    //             redrawRectangles();
    //             requestAnimationFrame(animate);
    //             // console.log(this);
    //         }
    //         else {
    //         console.log('la');
    //             this.rotationDegree = this.animationRotationTotal;
    //           return  this.animationInProgress = false;
              
              
    //             // animationCount--; // étape 3
    //             // if (animationCount === 0) { // étape 4
    //             //     this.animationInProgress = false;
    //             //     const index = rectangles.indexOf(this);
    //             //     if (index > -1) {
    //             //         rectangles.splice(index, 1);
    //             //         redrawRectangles();
    //             //     }
    //             // }
    //         }
    //     };
    //     // animationCount++; // étape 2
    //     requestAnimationFrame(animate);
    // }
    
    // removeRectangle(rectangle, rectangles, redrawRectangles){
    //     if (rectangle.animationInProgress) {
    //         // ne supprimez pas le rectangle s'il y a une animation en cours
    //         return;
    //     }
    //     const index = rectangles.indexOf(rectangle);
    //     if (index > -1) {
    //         rectangles.splice(index, 1);
    //         redrawRectangles();
    //     }
    // }




// draw() {
//     const { context } = this;
//     context.save();
//     context.fillStyle = this.color;
//     // context.beginPath();
//     // context.rect(this.x, this.y, this.width, this.height);
//     // context.fill();

//     context.translate(this.x + this.width / 2, this.y + this.height / 2);
//     context.rotate((this.rotation * Math.PI) / 180);
//     // context.fillStyle = this.color;
//     context.rect(-this.width / 2, -this.height / 2, this.width, this.height);
//     context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height)
//     //    context.fill(); // 
//     // context.closePath();

//     context.restore();
// }



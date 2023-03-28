export class Rectangle {
    constructor(x, y, width, height, color, context) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.area = width * height;
        this.color = color;
        this.animationRotation = 360; // Rotation total de l'animation en degré
        this.animationDuration = 20000 // Durée de l'animation
        this.animationProgress = 0
        this.rotation = 0;
        this.context = context;    
        this.isAnimate = false; // Gere le cas de la superposition des rectangles
        this.isPaired = false;
    }
    
    getArea() {
        this.area = this.width * this.height;
        return this.area;
    }

    draw() {
        const { context } = this;
        context.save();
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
            if (this.rotation < this.animationRotation) {
              context.clearRect(0, 0, context.canvas.width, context.canvas.height); 
                this.draw(); 
                requestAnimationFrame(animate);
            }else{
                redrawRectangles();
            }
        };
        requestAnimationFrame(animate);
    }
}

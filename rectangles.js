export class Rectangle {
    constructor(x, y, width, height, color, colorPair, context) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.area = width * height;
        // this.color = this.isPaired ? this.colorPair : this.colorNotPair;
        this.color = color;
        // this.colorPair = colorPair;
        this.rotation = 0;
        this.animationRotation = 360; 
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
        context.fillStyle = this.color;
        context.beginPath();
        context.rect(this.x, this.y, this.width, this.height);
        // context.fill();
        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate((this.rotation * Math.PI) / 180);
        // context.fillStyle = this.color;
        context.rect(-this.width / 2, -this.height / 2, this.width, this.height);
       context.fill(); // 
        // context.closePath();
        
       context.restore(); 
    }

    animateRotation() {
        const { context } = this;
        const start = performance.now();
        const duration = 1000;
        const animate = (timestamp) => {
         
            const progress = timestamp - start;
            this.rotation = (progress / duration) * this.animationRotation;
            if (progress < duration) {
               context.clearRect(0, 0, context.canvas.width, context.canvas.height); 
                this.draw(); // correction: appeler draw() sans argument
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }
}
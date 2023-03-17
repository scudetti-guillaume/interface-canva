export class Rectangle {

    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.rotation = 0;
      
    }

    draw(context) {
        context.fillStyle = this.color;
        context.fillRect(this.x, this.y, this.width, this.height);
        context.save(); // save the current transformation matrix
        context.translate(this.x + this.width / 2, this.y + this.height / 2); // move the origin to the center of the rectangle
        context.rotate((this.rotation * Math.PI) / 180); // apply the rotation
        context.fillStyle = this.color;
        context.fillRect(-this.width / 2, -this.height / 2, this.width, this.height); // draw the rectangle centered around the origin
        context.restore();
    }
    
    rotate() {
        this.rotation += 180;
    }

}

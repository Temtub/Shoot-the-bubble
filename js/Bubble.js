// Bubble.js

export class Bubble {
    
    constructor(canvas, ctx, images) {
        this.canvas = canvas
        this.ctx = ctx
        this.images = images
        this.size = Math.random() * 40 + 20
        this.x = Math.random() * (canvas.width - this.size)
        this.y = Math.random() * (canvas.height - this.size)
        this.speedX = (Math.random() - 0.5) * 4
        this.speedY = (Math.random() - 0.5) * 4
        this.points = Math.floor(this.size)
        this.imageColor = this.getColor()
    }

    getColor() {
        const colors = ['redBubble', 'blueBubble', 'yellowBubble']
        return colors[Math.floor(Math.random() * colors.length)]
    }

    draw() {
        if (this.images[this.imageColor]) {
            this.ctx.drawImage(this.images[this.imageColor], this.x, this.y, this.size, this.size)
        } 
    }

    update() {
        this.x += this.speedX
        this.y += this.speedY

        // Rebote en los bordes del lienzo
        if (this.x + this.size > this.canvas.width || this.x - this.size < 0) {
            this.speedX = -this.speedX
        }

        if (this.y + this.size > this.canvas.height || this.y - this.size < 0) {
            this.speedY = -this.speedY
        }
    }
}

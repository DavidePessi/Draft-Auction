let isTouching = false;
class ButtonClient{
    constructor(x, y, text, buttonRadius, color) {
        this.buttonX = x;
        this.buttonY = y;
        this.text = text;
        this.buttonRadius = buttonRadius;
        this.color = color;
        this.hover = false;
        this.updateSize();
    }

    updateSize() {
        this.textSize = this.buttonRadius * 0.8;
    }

    show() {
        fill(this.color);
        if (this.checkHover()) {
            fill(220, 255, 175);
        }
        noStroke();
        circle(this.buttonX, this.buttonY, this.buttonRadius * 0.8 * 2);

        fill(0);
        textSize(this.textSize);
        textAlign(CENTER, CENTER);

        text(this.text, this.buttonX, this.buttonY);
        textSize(12);
    }

    checkHover() {
        let d = dist(mouseX, mouseY, this.buttonX, this.buttonY);
        this.hover = (d < this.buttonRadius) && (isTouching || !this.isMobile());
        
        return this.hover;
    }

    isMobile() {
        return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    }     
}

// Global event handlers for touch
function touchStarted() {
    isTouching = true;
}

function touchEnded() {
    isTouching = false;
}
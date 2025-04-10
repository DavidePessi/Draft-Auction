class Button{
    constructor(x, y, h, text, sizeText, roundness){
        this.originalX = x;
        this.originalY = y;
        this.buttonX = x;
        this.buttonY = y;
        this.buttonH = h;
        this.text = text;
        this.textSize = sizeText;
        this.moveOffset = 5;
        this.hover = false;
        this.roundness = roundness;

        //DEFINISCO LA LUNGHEZZA DEL BOTTONE IN BASE AL TESTO
        textSize(sizeText);
        this.buttonW = 40 + textWidth(this.text);
        textSize(12);

        this.targetY = y;
        this.targetX = x;
    }

    show(){
        
        fill(250, 255, 91);
        rect(this.originalX, this.originalY, this.buttonW, this.buttonH, this.roundness);

        if(this.checkHover()){
            stroke(color(0));
            strokeWeight(3);
        }

        this.buttonY = lerp(this.buttonY, this.targetY, 0.1);
        this.buttonX = lerp(this.buttonX, this.targetX, 0.1);

        fill(173, 255, 122);
        rect(this.buttonX, this.buttonY, this.buttonW, this.buttonH, this.roundness); 
        noStroke();
        

        fill(0);
        textSize(this.textSize);
        text(this.text, this.buttonX + this.buttonW/2 - (textWidth(this.text)/2), this.buttonY + this.buttonH/2 + this.textSize/2 - (this.textSize/10));
        textSize(12);
    }

    updateOffsetX(newOffsetX){
        this.buttonX = newOffsetX;
        this.originalX = newOffsetX;
    }

    checkHover() {
        this.hover = (mouseX > this.buttonX &&
            mouseX < this.buttonX + this.buttonW &&
            mouseY > this.buttonY &&
            mouseY < this.buttonY + this.buttonH
        ) && (isTouching || !this.isMobile());


        // Set destination
        if (this.hover) {
            this.targetY = this.originalY - this.moveOffset;
            this.targetX = this.originalX - this.moveOffset;
        } else {
            this.targetY = this.originalY;
            this.targetX = this.originalX;
        }

        return this.hover;
    }

    isMobile() {
        return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    } 

}

function touchStarted() {
    isTouching = true;
}

function touchEnded() {
    isTouching = false;
}
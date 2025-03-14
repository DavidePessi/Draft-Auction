class Button{
    constructor(x, y, h, text, sizeText, roundness){
        this.buttonX = x;
        this.buttonY = y;
        this.buttonH = h;
        this.text = text;
        this.textSize = sizeText;
        this.hover = false;
        this.roundness = roundness;

        //DEFINISCO LA LUNGHEZZA DEL BOTTONE IN BASE AL TESTO
        textSize(sizeText);
        this.buttonW = 40 + textWidth(this.text);
        textSize(12);
    }

    show(){
        if(this.checkHover()){
            stroke(color(255));
            strokeWeight(3);
        }
        fill(194, 252, 159);
        rect(this.buttonX, this.buttonY, this.buttonW, this.buttonH, this.roundness); 
        noStroke();

        fill(0);
        textSize(this.textSize);
        text(this.text, this.buttonX + this.buttonW/2 - (textWidth(this.text)/2), this.buttonY + this.buttonH/2 + this.textSize/2 - (this.textSize/10));
        textSize(12);
    }

    updateOffsetX(newOffsetX){
        this.buttonX = newOffsetX;
    }

    checkHover(){
        this.hover = (mouseX > this.buttonX &&
            mouseX < this.buttonX + this.buttonW &&
            mouseY > this.buttonY &&
            mouseY < this.buttonY + this.buttonH
        );
        return this.hover;
    }

}
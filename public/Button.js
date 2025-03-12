class Button{
    constructor(x, y, w, h, text){
        this.buttonX = x;
        this.buttonY = y;
        this.buttonW = w;
        this.buttonH = h;
        this.text = text;
        this.hover = false;

    }

    show(){
        if(this.checkHover()){
            stroke(color(255));
            strokeWeight(3);
        }
        fill(194, 252, 159);
        rect(this.buttonX, this.buttonY, this.buttonW, this.buttonH, 30); 
        noStroke();

        fill(0);
        textSize(20);
        text(this.text, this.buttonX + 18, this.buttonY + this.buttonH/2 + 8)
        textSize(12);
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
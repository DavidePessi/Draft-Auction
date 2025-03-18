class ButtonImage{
    constructor(x, y, h){
        this.buttonX = x;
        this.buttonY = y;
        this.buttonH = h;
        this.hover = false;

        this.preload();
    }

    preload() {
        this.image = loadImage('./images/martello.png');
    }

    show(){
        
        if(this.checkHover()){
            stroke(color(255));
            strokeWeight(3);
        }
        fill(194, 252, 159);
        
        circle(this.buttonX, this.buttonY, this.buttonH);
        noStroke();
        let imgSize = this.buttonH * 0.6;
        let imgX = this.buttonX - imgSize / 2;
        let imgY = this.buttonY - imgSize / 2;
        
        image(this.image, imgX, imgY, imgSize, imgSize);
    }

    updateOffsetX(newOffsetX){
        this.buttonX = newOffsetX;
    }

    checkHover() {
        let d = dist(mouseX, mouseY, this.buttonX, this.buttonY);
        this.hover = (d < this.buttonH);
        
        return this.hover;
    }

}
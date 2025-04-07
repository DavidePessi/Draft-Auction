class ButtonImage{
    constructor(x, y, h, image, image2){
        this.originalX = x;
        this.originalY = y;
        this.buttonX = x;
        this.buttonY = y;
        this.buttonH = h;
        this.hover = false;
        this.switch = false;
        this.moveOffset = 5;

        this.preload(image, image2);
    }

    preload(image, image2) {
        this.image = loadImage(image);
        this.image2 = null;

        if(image2 != null){
            this.image2 = loadImage(image2);
        }
    }

    show(){
        fill(10);
        circle(this.originalX, this.originalY, this.buttonH);
        
        if(this.checkHover()){
            stroke(color(255));
            strokeWeight(1);
        }

        this.buttonY = lerp(this.buttonY, this.targetY, 0.1);

        fill(194, 252, 159);
        circle(this.buttonX, this.buttonY, this.buttonH);
        noStroke();
        let imgSize = this.buttonH * 0.6;
        let imgX = this.buttonX - imgSize / 2;
        let imgY = this.buttonY - imgSize / 2;
        
        if(!this.switch){
            image(this.image, imgX, imgY, imgSize, imgSize);
        } else{
            image(this.image2, imgX, imgY, imgSize, imgSize);
        }
    }

    switchImage(){
        if(this.image2 != null){
            this.switch = !this.switch;
        }
    }

    updateOffsetX(newOffsetX){
        this.buttonX = newOffsetX;
        this.originalX = newOffsetX;
    }

    checkHover() {
        let d = dist(mouseX, mouseY, this.buttonX, this.buttonY);
        this.hover = (d < (this.buttonH/2));

        if (this.hover) {
            this.targetY = this.originalY - this.moveOffset;
        } else {
            this.targetY = this.originalY;
        }
        
        return this.hover;
    }
}
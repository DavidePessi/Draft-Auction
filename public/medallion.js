class Medallion{
    constructor(x, y, h, text, sizeText){
        this.buttonX = x;
        this.buttonY = y;
        this.buttonH = h;
        this.text = text;
        this.textSize = sizeText;

        this.buttonW = this.updateWidth();
    }

    show(){
        fill(255);
        rect(this.buttonX, this.buttonY, this.buttonW, this.buttonH, 100); 
        noStroke();

        fill(0);
        textSize(this.textSize);
        text(this.text, this.buttonX + this.buttonW/2 - (textWidth(this.text)/2), this.buttonY + this.buttonH/2 + this.textSize/2 - (this.textSize/10));
        textSize(12);
    }

    //update del testo e quindi della lunghezza del margine
    updateText(newText){
        this.text = newText;
        this.buttonW = this.updateWidth();
    }

    updateWidth(){
        //DEFINISCO LA LUNGHEZZA DEL MARGINE IN BASE AL TESTO
        textSize(this.textSize);
        var result = 40 + textWidth(this.text);
        textSize(12);
        
        return result;
    }

    updateOffsetX(newOffsetX){
        this.buttonX = newOffsetX;
    }

    GetWidth(){
        return this.buttonW;
    }

    GetHeight(){
        return this.buttonH;
    }
}
class PlayerSearch{
    constructor(player, sizeText){
        this.buttonH = 50;
        this.player = player;
        this.textSize = sizeText;
        this.roundness = 50;

        this.buttonX = 0;
        this.buttonY = 0;

        this.hover = false;

        //DEFINISCO LA LUNGHEZZA DEL BOTTONE IN BASE AL TESTO
        textSize(sizeText);
        this.buttonW = 70 + 35 + textWidth(this.player.name);
        textSize(12);
    }

    show(offsetX, offsetY){
        //sfondo
        fill(173, 255, 122);
        if(this.checkHover()){
            fill(220, 255, 175);
        }
        rect(offsetX, offsetY, this.buttonW, this.buttonH, this.roundness); 
        noStroke();

        //ruolo
        fill(this.player.GetColorRuolo());
        circle(offsetX + 20, offsetY + this.buttonH/2, 30);
        fill(0);
        textSize(this.textSize)
        text(this.player.GetRuolo(), offsetX + 4 + 10, offsetY + this.buttonH/2 + this.textSize/2 - (this.textSize/10));

        //nome
        fill(0);
        text(this.player.name, offsetX + this.buttonW/2 - (textWidth(this.player.name)/2) - 10, offsetY + this.buttonH/2 + this.textSize/2 - (this.textSize/10));

        //squadra
        fill(255);
        rect(offsetX + (this.buttonW/2) + (textWidth(this.player.name)/2) - 5, offsetY + this.buttonH/2 - 15, 55, 30, 60);
        fill(0);
        textSize(this.textSize);
        textAlign(CENTER, CENTER);
        text(this.player.GetSquadra(), offsetX + (this.buttonW / 2) + (textWidth(this.player.name) / 2) - 5 + 55 / 2, offsetY + this.buttonH / 2);
        textSize(12);

        textAlign(LEFT, BASELINE);
        textSize(12);


        //update offsets
        this.buttonX = offsetX;
        this.buttonY = offsetY;
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
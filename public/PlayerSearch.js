class PlayerSearch{
    constructor(player, sizeText){
        this.buttonH = 50;
        this.player = player;
        this.textSize = sizeText;
        this.roundness = 50;

        //DEFINISCO LA LUNGHEZZA DEL BOTTONE IN BASE AL TESTO
        textSize(sizeText);
        this.buttonW = 70 + 45 + textWidth(this.player.name);
        textSize(12);
    }

    show(offsetX, offsetY){
        //sfondo
        fill(194, 252, 159);
        rect(offsetX, offsetY, this.buttonW, this.buttonH, this.roundness); 
        noStroke();

        //ruolo
        fill(this.player.GetColorRuolo());
        circle(offsetX + 20, offsetY + this.buttonH/2, 30);
        fill(0);
        textSize(this.textSize)
        text(this.player.GetRuolo(), offsetX + 4 + 10, offsetY + this.buttonH/2 + this.textSize/2 - (this.textSize/10));
        textSize(12);

        //nome
        fill(0);
        textSize(this.textSize);
        text(this.player.name, offsetX + this.buttonW/2 - (textWidth(this.player.name)/2) - 20, offsetY + this.buttonH/2 + this.textSize/2 - (this.textSize/10));
        textSize(12);

        //squadra
        fill(255)
        rect(offsetX + this.buttonW/2 + (textWidth(this.player.name)/2) + 5, offsetY + this.buttonH/2 - 15, 55, 30, 60);
        fill(0);
        textSize(this.textSize)
        text(this.player.GetSquadra(), offsetX + this.buttonW / 2 + (textWidth(this.player.name) / 2) + 5 + 55 / 2 - textWidth("aaa") / 2 - 7, offsetY + this.buttonH/2 + this.textSize/2 - (this.textSize/10));
        textSize(12);
    }


    /*
    checkHover(){
        this.hover = (mouseX > this.buttonX &&
            mouseX < this.buttonX + this.buttonW &&
            mouseY > this.buttonY &&
            mouseY < this.buttonY + this.buttonH
        );
        return this.hover;
    }*/
}
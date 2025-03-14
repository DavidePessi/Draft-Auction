class Team{
    constructor(name){
        this.players = [];
        this.playersCost = [];
        this.crediti = 50;
        this.name = name;
        this.nameShorted = this.AbbreviateName();
        

        for(var i = 0; i < 25; i++){
            this.players.push("jeff");
            this.playersCost.push("45");
        }

        
    }

    show(offsetX, offsetY){
        fill(255);

        //TESTO
        textSize(20);
        textStyle(BOLD);
        
        text(this.nameShorted, 10 + offsetX, 10 + offsetY - 10);


        text(this.crediti, windowWidth/12 - textWidth(this.crediti.toString()) + offsetX , 10 + offsetY - 10);

        textStyle(NORMAL)
        textSize(12);


        //stampa sfondo
        noStroke();
        fill(192, 252, 159);
        rect(10 + offsetX, 11 + offsetY, windowWidth/12, 520, 15); 

        //stampa coin
        this.showCoinP(0 + offsetY, offsetX);
        this.showCoinP(20 + offsetY, offsetX);
        this.showCoinP(40 + offsetY, offsetX);
        this.showCoinD(60 + offsetY, offsetX);
        this.showCoinD(80 + offsetY, offsetX);
        this.showCoinD(100 + offsetY, offsetX);
        this.showCoinD(120 + offsetY, offsetX);
        this.showCoinD(140 + offsetY, offsetX);
        this.showCoinD(160 + offsetY, offsetX);
        this.showCoinD(180 + offsetY, offsetX);
        this.showCoinD(200 + offsetY, offsetX);
        this.showCoinC(220 + offsetY, offsetX);
        this.showCoinC(240 + offsetY, offsetX);
        this.showCoinC(260 + offsetY, offsetX);
        this.showCoinC(280 + offsetY, offsetX);
        this.showCoinC(300 + offsetY, offsetX);
        this.showCoinC(320 + offsetY, offsetX);
        this.showCoinC(340 + offsetY, offsetX);
        this.showCoinC(360 + offsetY, offsetX);
        this.showCoinA(380 + offsetY, offsetX);
        this.showCoinA(400 + offsetY, offsetX);
        this.showCoinA(420 + offsetY, offsetX);
        this.showCoinA(440 + offsetY, offsetX);
        this.showCoinA(460 + offsetY, offsetX);
        this.showCoinA(480 + offsetY, offsetX);

        //stampa nomi giocatori presi
        this.showNames(offsetX, offsetY);
    }

    //GET NAME
    GetName(){
        return this.name;
    }

    //ABBREVIATE NAMES
    AbbreviateName(){
        const maxWidth = windowWidth /12;
        var result = this.name;
        var lengthCrediti = this.crediti.toString().length;
        while((result.length + lengthCrediti) * 12 >= maxWidth && result.length > 0){
            result = result.substring(0, result.length - 1);
        }

        return result;
    }

    Resize(){
        this.nameShorted = this.AbbreviateName();
    }

    //SHOW COIN
    showCoinP(offsetY, offsetX){
        noStroke();
        fill(235, 174, 52);
        circle(20 + offsetX, 30 + offsetY, 15); 
        fill(0);
        text("p", 17 + offsetX, 33 + offsetY);
    }
    showCoinD(offsetY, offsetX){
        noStroke();
        fill(52, 235, 64);
        circle(20 + offsetX, 30 + offsetY, 15); 
        fill(0);
        text("d", 17 + offsetX, 33 + offsetY);
    }
    showCoinC(offsetY, offsetX){
        noStroke();
        fill(52, 192, 235);
        circle(20 + offsetX, 30 + offsetY, 15); 
        fill(0);
        text("c", 17 + offsetX, 33 + offsetY);
    }
    showCoinA(offsetY, offsetX){
        noStroke();
        fill(235, 55, 52);
        circle(20 + offsetX, 30 + offsetY, 15); 
        fill(0);
        text("a", 17 + offsetX, 33 + offsetY);
    }

    //SHOW NAMES
    showNames(offsetX, offsetY){
        for(var i = 0; i < 25 ; i++){
            fill(0);
            text(this.players[i], 30 + offsetX, 33 + offsetY + 20 * i);
            text(this.playersCost[i], offsetX + windowWidth/12 - textSize(this.playersCost[i]), 33 + offsetY + 20 * i);
        }
    }
}
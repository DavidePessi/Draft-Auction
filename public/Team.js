class Team{
    constructor(name){
        this.portieri = [];
        this.difensori = [];
        this.centrocampisti = [];
        this.attaccanti = [];
        
        this.crediti = 500;
        this.massimaPuntata = 476;
        this.name = name;
        this.nameShorted = this.AbbreviateName();

        this.currentOffsetX = 0;
        this.currentOffsetY = 0;

        this.hover = false;
        this.deleteHovers = [false, false, false, false, false,
                             false, false, false, false, false,
                             false, false, false, false, false,
                             false, false, false, false, false,
                             false, false, false, false, false
                            ];
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
        if(this.CheckHover()){
            stroke(color(0));
            strokeWeight(3);
        }
        fill(192, 252, 159);
        rect(10 + offsetX, 11 + offsetY, windowWidth/12, 520, 15); 

        noStroke();

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

        this.currentOffsetX = offsetX;
        this.currentOffsetY = offsetY;
    }

    // CHECK IF MOUSE IS HOVER THE TEAM
    CheckHover(){
        this.hover = (mouseX > 10 + this.currentOffsetX &&
            mouseX < 10 + this.currentOffsetX + windowWidth/12 &&
            mouseY > 11 + this.currentOffsetY &&
            mouseY < 11 + this.currentOffsetY + 520
        );
        return this.hover;
    }

    // CHECK IF MOUSE IS HOVER A DELETE BUTTON
    CheckHoverDelete(offsetX, offsetY, radius, k){
        let d = dist(mouseX, mouseY, offsetX, offsetY);
        this.deleteHovers[k] = (d < radius);
    }

    // GET NAME
    GetName(){
        return this.name;
    }

    // ABBREVIATE NAMES
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

    // SHOW COIN
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

    // SHOW NAMES
    showNames(offsetX, offsetY){
        var k = 0;
        for(var i = 0; i <  this.portieri.length; i ++){
            fill(0);
            text(this.portieri[i].GetName(), 30 + offsetX, 33 + offsetY + 20 * k);

            if(this.hover){
                this.CheckHoverDelete(offsetX - 3 + windowWidth/12, 30 + offsetY + 20 * k, 15/2, k);

                noStroke();
                fill(255, 0, 0);
                if(this.deleteHovers[k]){
                    fill(255);
                }
                
                circle(offsetX - 3 + windowWidth/12, 30 + offsetY + 20 * k, 15);
            } else {
                text(this.portieri[i].GetCosto().toString(), offsetX + windowWidth/12 - textSize(this.portieri[i].GetCosto().toString()), 33 + offsetY + 20 * k);
            }
            k++;
        }
        for(var i = 0; i < 3 - this.portieri.length; i ++){
            k++;
        }
        for(var i = 0; i <  this.difensori.length; i ++){
            fill(0);
            text(this.difensori[i].GetName(), 30 + offsetX, 33 + offsetY + 20 * k);

            if(this.hover){
                this.CheckHoverDelete(offsetX - 3 + windowWidth/12, 30 + offsetY + 20 * k, 15/2, k);

                noStroke();
                fill(255, 0, 0);
                if(this.deleteHovers[k]){
                    fill(255);
                }

                circle(offsetX - 3 + windowWidth/12, 30 + offsetY + 20 * k, 15);
            } else {
                text(this.difensori[i].GetCosto().toString(), offsetX + windowWidth/12 - textSize(this.difensori[i].GetCosto().toString()), 33 + offsetY + 20 * k);
            }
            k++;
        }
        for(var i = 0; i < 8 - this.difensori.length; i ++){
            k++;
        }
        for(var i = 0; i <  this.centrocampisti.length; i ++){
            fill(0);
            text(this.centrocampisti[i].GetName(), 30 + offsetX, 33 + offsetY + 20 * k);

            if(this.hover){
                this.CheckHoverDelete(offsetX - 3 + windowWidth/12, 30 + offsetY + 20 * k, 15/2, k);

                noStroke();
                fill(255, 0, 0);
                if(this.deleteHovers[k]){
                    fill(255);
                }

                circle(offsetX - 3 + windowWidth/12, 30 + offsetY + 20 * k, 15);
            } else {
                text(this.centrocampisti[i].GetCosto().toString(), offsetX + windowWidth/12 - textSize(this.centrocampisti[i].GetCosto().toString()), 33 + offsetY + 20 * k);
            }
            k++;
        }
        for(var i = 0; i < 8 - this.centrocampisti.length; i ++){
            k++;
        }
        for(var i = 0; i <  this.attaccanti.length; i ++){
            fill(0);
            text(this.attaccanti[i].GetName(), 30 + offsetX, 33 + offsetY + 20 * k);
            if(this.hover){
                this.CheckHoverDelete(offsetX - 3 + windowWidth/12, 30 + offsetY + 20 * k, 15/2, k);

                noStroke();
                fill(255, 0, 0);
                if(this.deleteHovers[k]){
                    fill(255);
                }

                circle(offsetX - 3 + windowWidth/12, 30 + offsetY + 20 * k, 15);
            } else {
                text(this.attaccanti[i].GetCosto().toString(), offsetX + windowWidth/12 - textSize(this.attaccanti[i].GetCosto().toString()), 33 + offsetY + 20 * k);
            }
            k++;
        }
        for(var i = 0; i < 6 - this.attaccanti.length; i ++){
            k++;
        }
    }

    AddPlayer(player){
        //console.log("player: " + player);
        if(player.GetRuolo() === "P"){
            this.portieri.push(player);
        }else if(player.GetRuolo() === "D"){
            this.difensori.push(player);
        }else if(player.GetRuolo() === "C"){
            this.centrocampisti.push(player);
        }else if(player.GetRuolo() === "A"){
            this.attaccanti.push(player);
        }

        this.crediti -= player.GetCosto();
        this.massimaPuntata -= player.GetCosto() + 1;
    }

    // RIMUOVE IL GIOCATORE CHE STO CERCANDO DI ELIMINARE
    RemovePlayer(){
        var playerEliminated = null;
        for(var i = 0; i < 3; i++){
            if(this.deleteHovers[i]){
                playerEliminated = this.portieri[i];
                this.crediti += playerEliminated.GetCosto();
                this.massimaPuntata += playerEliminated.GetCosto() - 1;
                this.portieri.splice(i, 1);
            }
        }

        for(var i = 0; i < 8; i++){
            if(this.deleteHovers[3 + i]){
                playerEliminated = this.difensori[i];
                this.crediti += playerEliminated.GetCosto();
                this.massimaPuntata += playerEliminated.GetCosto() - 1;
                this.difensori.splice(i, 1);
            }
        }

        for(var i = 0; i < 8; i++){
            if(this.deleteHovers[11 + i]){
                playerEliminated = this.centrocampisti[i];
                this.crediti += playerEliminated.GetCosto();
                this.massimaPuntata += playerEliminated.GetCosto() - 1;
                this.centrocampisti.splice(i, 1);
            }
        }

        for(var i = 0; i < 6; i++){
            if(this.deleteHovers[19 + i]){
                playerEliminated = this.attaccanti[i];
                this.crediti += playerEliminated.GetCosto();
                this.massimaPuntata += playerEliminated.GetCosto() - 1;
                this.attaccanti.splice(i, 1);
            }
        }
        return playerEliminated;
    }

    GenerateListPlayers(){
        let list = "";

        this.portieri.forEach(portiere => {
            list += "$,$,$\n";
            list += `${this.name},${portiere.GetID()},${portiere.GetCosto()}\n`;
        });

        this.difensori.forEach(difensore => {
            list += "$,$,$\n";
            list += `${this.name},${difensore.GetID()},${difensore.GetCosto()}\n`;
        });

        this.centrocampisti.forEach(centrocampista => {
            list += "$,$,$\n";
            list += `${this.name},${centrocampista.GetID()},${centrocampista.GetCosto()}\n`;
        });

        this.attaccanti.forEach(attaccante => {
            list += "$,$,$\n";
            list += `${this.name},${attaccante.GetID()},${attaccante.GetCosto()}\n`;
        });

        return list;
    }
}
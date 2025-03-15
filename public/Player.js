class Player{
    constructor(ID, name, squadra, ruolo){
        this.ID =ID;
        this.name = name;
        this.squadra = squadra;
        this.ruolo = ruolo;
        this.costo = 0;
        this.ruoloColor;

        this.initializeRuoloColor();
        this.initializeSquadra();
    }

    initializeRuoloColor(){
        if(this.ruolo === "p" || this.ruolo == "P"){
            this.ruoloColor = color(235, 174, 52);
        } else if(this.ruolo === "d" || this.ruolo == "D"){
            this.ruoloColor = color(52, 235, 64);
        } else if(this.ruolo === "c" || this.ruolo == "C"){
            this.ruoloColor = color(52, 192, 235);
        } else if(this.ruolo === "a" || this.ruolo == "A"){
            this.ruoloColor = color(235, 55, 52);
        }
        
    }

    initializeSquadra(){
        this.squadra = this.squadra.slice(0, 3);
    }

    GetID(){
        return this.ID;
    }

    GetName(){
        return this.name;
    }

    GetSquadra(){
        return this.squadra;
    }

    GetCosto(){
        return this.costo;
    }

    GetRuolo(){
        return this.ruolo;
    }

    GetColorRuolo(){
        return this.ruoloColor;
    }

    SetCosto(newCosto){
        this.costo = newCosto;
    }
}
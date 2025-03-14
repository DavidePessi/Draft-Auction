class Player{
    constructor(ID, name, squadra, ruolo){
        this.ID =ID;
        this.name = name;
        this.squadra = squadra;
        this.ruolo = ruolo;
        this.costo = 0;
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

    SetCosto(newCosto){
        this.costo = newCosto;
    }
}
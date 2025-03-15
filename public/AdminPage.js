class AdminPage{
    constructor(socket){
        //var buttonLoadCSV  = createButton('Load CSV');
        this.socket = socket;

        // VARIABILI ASTA
        this.currentQuota = 0;
        this.currentPlayer = "Gosens";
        this.currentSquadra = "Ata";
        this.currentSquadraVincente = "Jeff";

        // LISTONE
        this.playersList;


        //INPUT BOX DA METTERE A POSTO
        let magnifyingIcon;        
        inputBox = createInput("");
        inputBox.position(windowWidth - 300, windowHeight/12); // Posizione sulla canvas
        inputBox.size(200);
        inputBox.style("font-size", "20px");
        inputBox.style("border", "none");
        inputBox.style("background", "white");
        inputBox.style("padding", "14px");
        inputBox.style("border-radius", "999px");
        magnifyingIcon = createDiv('<i class="fas fa-search"></i>');
        magnifyingIcon.size(20, 20); // Imposta la dimensione dell'icona
        magnifyingIcon.position(windowWidth - 100, windowHeight / 12 + 15);

        // RICERCA GIOCATORI
        this.previousValueText = inputBox.value();
        this.currentResearchList = null;
        this.currentResearchComponents = [];


        // VARIABILI TEAM
        this.teams = [];

        //definisco i testi
        this.PlayerName = new Medallion(windowWidth/4, windowHeight/12, 100, this.currentPlayer, 64);
        this.Squadra = new Medallion(windowWidth/4 + this.PlayerName.GetWidth() + 20, windowHeight/12, 100, this.currentSquadra, 64);
        this.Crediti = new Medallion(windowWidth/4, windowHeight/12 + this.PlayerName.GetHeight() + 20, 100, this.currentQuota, 64);
        this.SquadraVincente = new Medallion(windowWidth/4 + this.Crediti.GetWidth() + 20, windowHeight/12 + this.PlayerName.GetHeight() + 20, 100, this.currentSquadraVincente, 64);

        //definisco i pulsanti
        this.CSVButton = new Button(windowWidth - 300 - 200, windowHeight/12, 50, "importa listone", 20, 30);
        this.DownloadButton = new Button(windowWidth - 470 - 200, windowHeight/12, 50, "scarica rose", 20, 30);
        this.Assegna = new Button(windowWidth/4 + this.Crediti.GetWidth() + 40 + this.SquadraVincente.GetWidth(), windowHeight/12 + this.PlayerName.GetHeight() + 20, 100, "[■]", 64, 100);
    }

    show(){
        background(59);

        //stampo i bottoni
        this.CSVButton.show();
        this.DownloadButton.show();
        this.Assegna.show();

        //stampo la parte dell'asta
        this.PlayerName.show();
        this.Squadra.show();
        this.Crediti.show();
        this.SquadraVincente.show();

        //stampo i team
        for(var i = 0; i < this.teams.length; i++){
            this.teams[i].show(windowWidth/10 * i, windowHeight - 560);
        }

        //aggiorno la ricerca giocatori
        this.checkSearch();
        this.showSearchList();
    }

    // RESIZE
    Resize(){
        for(var i = 0; i < this.teams.length; i++){
            this.teams[i].Resize();
        }
    }

    // CLICK BUTTON FUNCTIONS
    mousePressed(){
        if(this.CSVButton.hover){
            this.askForFile();
        }
    }

    // CAMBIARE LA QUOTA IN BASE A QUANTO HANNO AGGIUNTO
    AddQuota(value, nomeSquadra){
        this.currentSquadraVincente = nomeSquadra;
        this.SquadraVincente.updateText(this.currentSquadraVincente);
        this.SquadraVincente.updateWidth();

        this.currentQuota += value;
        this.Crediti.updateText(this.currentQuota);
        this.Crediti.updateWidth();
        
        this.SquadraVincente.updateOffsetX(windowWidth/4 + this.Crediti.GetWidth() + 20);
        this.Assegna.updateOffsetX(windowWidth/4 + this.Crediti.GetWidth() + 40 + this.SquadraVincente.GetWidth());

    }

    // AGGIUNGE UN TEAM A QUELLI PRESENTI
    AddTeam(name){
        var _exist = false;
        for(var i = 0; i < this.teams.length; i++){
            if(this.teams[i].GetName() === name){
                _exist = true;
            }
        }
        if(!_exist){
            this.teams.push(new Team(name));
        }
        else{
        }
    }

    // ASKING THE XCL FILE
    askForFile() {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".xlsx, .xls";
    
        input.addEventListener("change", (event) => {
            const file = event.target.files[0];
    
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const data = new Uint8Array(event.target.result);
                    const workbook = XLSX.read(data, { type: "array" });
                    const sheetName = workbook.SheetNames[0]; // Prende il primo foglio
                    const sheet = workbook.Sheets[sheetName];
    
                    // Converte il foglio in un array di oggetti
                    const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
                    // Ignora la prima riga (headers)
                    this.playersList = this.createPlayers(parsedData.slice(2));
                    
                    this.displayData(this.playersList);
                };
                reader.readAsArrayBuffer(file);
            } else {
                alert("Nessun file selezionato.");
            }
        });
    
        input.click();
    }
    
    // CREAZIONE DEGLI OGGETTI Player
    createPlayers(data) {
        return data.map(row => new Player(
            row[0] || 0,    // ID
            row[3] || "",   // Nome
            row[4] || "",   // Squadra
            row[1] || ""    // ruolo
        ));
    }
    
    // MOSTRA I DATI NELLA CONSOLE
    displayData(players) {
        console.log("Lista di Giocatori:");
        console.table(players); // Stampa tabella nella console
    }

    // CHECK SE IL TESTO NELLA BARRA DI RICERCA E' CAMBIATO
    checkSearch(){
        if(inputBox.value() === this.previousValueText){}else{
            this.previousValueText = inputBox.value();
            this.currentResearchList = this.searchPlayers(this.previousValueText, this.playersList);
            this.updateSearchList();
        }
    }

    // AGGIORNO LA LISTA DEI MIEI COMPONENTI
    updateSearchList(){
        this.currentResearchComponents.length = 0;
        
        for(var i = 0; i < this.currentResearchList.length; i++){
            this.currentResearchComponents.push(new PlayerSearch(this.currentResearchList[i], 20));
        }        
    }

    showSearchList(){
        var offset = 75;
        for(var i = 0; i < this.currentResearchComponents.length; i++){
            this.currentResearchComponents[i].show(windowWidth - 300, windowHeight/12 + offset);
            offset += 60;
        }
    }

    // RICERCA DEI DATI ALL'INTERNO DEL DATABASE DEI GIOCATORI
    searchPlayers(input, listPlayer) {
        if (!input || input.trim() === "") return []; // Se l'input è vuoto, restituisci un array vuoto
    
        input = input.toLowerCase().trim(); // Normalizziamo l'input
    
        // Calcola la somiglianza tra input e nome di ogni giocatore
        let results = listPlayer
            .map(player => {
                const playerName = player.name.toLowerCase().trim();
                const similarity = this.levenshteinDistance(input, playerName); // Distanza di Levenshtein
                const includesInput = playerName.includes(input) ? 0 : 1; // Se contiene direttamente il testo, meglio
    
                return { player, score: similarity + includesInput };
            })
            .sort((a, b) => a.score - b.score) // Ordina i risultati dal più simile al meno simile
            .slice(0, 5) // Prende solo i primi 5
        
        this.displayData(results.map(r => r.player));
        return results.map(r => r.player);
    }

    // FUNZIONE DI SIMILITUDINE
    levenshteinDistance(a, b) {
        const dp = Array.from(Array(a.length + 1), () => Array(b.length + 1).fill(0));
    
        for (let i = 0; i <= a.length; i++) dp[i][0] = i;
        for (let j = 0; j <= b.length; j++) dp[0][j] = j;
    
        for (let i = 1; i <= a.length; i++) {
            for (let j = 1; j <= b.length; j++) {
                if (a[i - 1] === b[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i][j - 1], dp[i - 1][j]) + 1;
                }
            }
        }
        return dp[a.length][b.length];
    }

    
}
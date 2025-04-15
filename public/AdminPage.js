class AdminPage{
    constructor(socket){
        this.socket = socket;

        // VARIABILI ASTA
        this.currentQuota = 0;                  // Valore che una squadra ha puntato per prendere il giocatore corrente
        this.currentPlayer = "";                // Nome del giocatore corrente
        this.currentSquadra = "";               // Squadra del giocatore corrente
        this.currentSquadraVincente = "";       // Fanta squadra che ha messo l'ultima puntata per il giocatore corrente
        this.player = null;
        this.isPlayerAssignable = false;        // True se il tempo è scaduto false otherwise

        // LISTONE
        this.playersList;                       // Lista di tutti i giocatori sottoforma di tipo Player

        // STYLE VARIABLES
        this.marginLeftButtons = 15;


        // INPUT BOX
        inputBox = createInput("");
        inputBox.position(windowWidth - 300, windowHeight/40);
        inputBox.size(200);
        inputBox.style("font-size", "20px");
        inputBox.style("border", "none");
        inputBox.style("background", "white");
        inputBox.style("padding", "14px");
        inputBox.style("border-radius", "999px");
        inputBox.style("outline", "none");
        inputBox.style("box-shadow", "none");
        inputBox.elt.addEventListener("focus", () => {
            inputBox.style("box-shadow", "0 0 0 3px black");
        });
        inputBox.elt.addEventListener("blur", () => {
            inputBox.style("box-shadow", "none");
        });

        this.magnifyingIcon = createDiv('<i class="fas fa-search"></i>');
        this.magnifyingIcon.size(20, 20);
        this.magnifyingIcon.position(windowWidth - 100, windowHeight / 40 + 15);

        // VARIABILI RICERCA GIOCATORI
        this.previousValueText = inputBox.value();
        this.currentResearchList = null;
        this.currentResearchComponents = [];

        // VARIABILI TEAM
        this.teams = [];

        // DEFINISCO I TESTI
        this.PlayerName = new Medallion(windowWidth/4, windowHeight/20, 100, this.currentPlayer, 64);
        this.Squadra = new Medallion(windowWidth/4 + this.PlayerName.GetWidth() + 20, windowHeight/20, 100, this.currentSquadra, 64);
        this.Crediti = new Medallion(windowWidth/4, windowHeight/20 + this.PlayerName.GetHeight() + 20, 100, this.currentQuota, 64);
        this.SquadraVincente = new Medallion(windowWidth/4 + this.Crediti.GetWidth() + 20, windowHeight/20 + this.PlayerName.GetHeight() + 20, 100, this.currentSquadraVincente, 64);

        // DEFINISCO I PULSANTI
        this.CSVButton = new Button(windowWidth - 300 - 170 - this.marginLeftButtons, windowHeight/40, 50, "importa listone", 20, 30);
        this.DownloadButton = new Button(windowWidth - 300 - 170 - 147 - 2 * this.marginLeftButtons, windowHeight/40, 50, "scarica rose", 20, 30);
        this.CaricaAstaButton = new Button(windowWidth - 300 - 170 - 147 - 153 - 3 * this.marginLeftButtons, windowHeight/40, 50, "riprendi asta", 20, 30);
        this.Pause = new ButtonImage(windowWidth - 300 - 170 - 147 - 153 - 25 -  4 * this.marginLeftButtons, windowHeight/40 + 25, 50, './images/pause.png', './images/resume.png');
        this.Assegna = new ButtonImage(windowWidth/4 + this.Crediti.GetWidth() + 90 + this.SquadraVincente.GetWidth(), windowHeight/20 + this.PlayerName.GetHeight() + 70, 100, './images/martello.png', null);
        

        // DEFINISCO IL TIMER
        this.timer = new Timer(windowWidth/4 + this.Crediti.GetWidth() + 90 + this.SquadraVincente.GetWidth(), windowHeight/20 + this.PlayerName.GetHeight() + 70, 100, 64);
    }

    // SHOW: chiamata ogni fram
    show(){
        // STAMPA
        background(37, 48, 49);

        // stampo il timer
        if(!this.isPlayerAssignable){
            this.timer.show();
        }

        // stampo i bottoni
        this.CSVButton.show();
        this.DownloadButton.show();
        this.CaricaAstaButton.show();
        this.Pause.show();

        if(this.isPlayerAssignable){
            this.Assegna.show();
        }

        // stampo la parte dell'asta
        this.PlayerName.show();
        this.Squadra.show();
        this.Crediti.show();
        this.SquadraVincente.show();

        // stampo i team
        for(var i = 0; i < this.teams.length; i++){
            this.teams[i].show(windowWidth/10 * i, windowHeight - 560);
        }

        // ESECUZIONE DI FUNZIONI

        // aggiorno la ricerca giocatori
        this.checkSearch(false);
        this.showSearchList();

        // verifico se il timer è scaduto
        if(this.timer.time === 0){
            this.isPlayerAssignable = true;
            this.timer.time = 15;
        }
    }

    // RESIZE: chiamata quando abbiamo un cambiamento della pagina
    Resize(){
        for(var i = 0; i < this.teams.length; i++){
            this.teams[i].Resize();
        }

        inputBox.position(windowWidth - 300, windowHeight/40);
        this.magnifyingIcon.position(windowWidth - 100, windowHeight / 40 + 15);
        this.CSVButton.updateOffsetX(windowWidth - 300 - 170 - this.marginLeftButtons);
        this.DownloadButton.updateOffsetX(windowWidth - 300 - 170 - 147 - 2 * this.marginLeftButtons);
        this.CaricaAstaButton.updateOffsetX(windowWidth - 300 - 170 - 147 - 153 - 25 -  4 * this.marginLeftButtons);
        this.Pause.updateOffsetX(windowWidth - 300 - 170 - 147 - 153 - 25 -  3 * this.marginLeftButtons);

        this.PlayerName.updateOffsetX(windowWidth/4);
        this.Squadra.updateOffsetX(windowWidth/4 + this.PlayerName.GetWidth() + 20);
        this.Crediti.updateOffsetX(windowWidth/4, windowHeight/20 + this.PlayerName.GetHeight() + 20);
        this.SquadraVincente.updateOffsetX(windowWidth/4 + this.Crediti.GetWidth() + 20, windowHeight/20 + this.PlayerName.GetHeight() + 20);

        this.Assegna.updateOffsetX(windowWidth/4 + this.Crediti.GetWidth() + 90 + this.SquadraVincente.GetWidth());
        this.timer.updateOffsetX(windowWidth/4 + this.Crediti.GetWidth() + 90 + this.SquadraVincente.GetWidth());
    }

    // MOUSE PRESSED: chiamata quando viene fatto click con il tasto sinistro del mouse
    mousePressed(){

        // check if CSVButton is being pressed
        if(this.CSVButton.hover){
            this.askForFile();
        } else {
            // check if any researched player is being pressed
            for(var i = 0; i < this.currentResearchComponents.length; i++){
                if(this.currentResearchComponents[i].hover){
                    this.SelectPlayer(this.currentResearchComponents[i].player);
                }
            }

            // check if any Assegna is being pressed
            if(this.Assegna.hover){
                this.AssegnaPlayer();
            }

            // check if DownloadButton is being pressed
            if(this.DownloadButton.hover){
                this.DownloadCSV();
            }

            // check if riprendi asta is being pressed
            if(this.CaricaAstaButton.hover){
                this.AskFileAsta();
            }

            // check if Pause is being pressed
            if(this.Pause.hover){
                
                if(this.timer.isPaused){
                    this.timer.resumeTimer();
                    this.Pause.switchImage();
                } else {
                    this.timer.pauseTimer();
                    this.Pause.switchImage();
                }
            }

            // check if any team is being pressed
            for(var i = 0; i < this.teams.length; i++){
                if(this.teams[i].hover){
                    this.playersList.push(this.teams[i].RemovePlayer());
                }
            }
        } 
    }

    // ADD QUOTA: chiamata quando una fanta squadra ha mandato una nuova offerta per il giocatore
    AddQuota(value, nomeSquadra){

        // verifico se la squadra esiste e la cerco
        if(!(this.currentSquadraVincente === nomeSquadra)){
            var squadraPropositrice;
            
            this.teams.forEach(team => {
                if(nomeSquadra === team.name){
                    squadraPropositrice = team;
                    console.log("");
                }
            });

            // verifico se la persona ha abbastanza crediti e abbia spazio sufficiente nella squadra
            if(squadraPropositrice.massimaPuntata >= this.currentQuota + value && (
                (this.player.GetRuolo() === "P" && squadraPropositrice.portieri.length < 3) ||
                (this.player.GetRuolo() === "D" && squadraPropositrice.difensori.length < 8) ||
                (this.player.GetRuolo() === "C" && squadraPropositrice.centrocampisti.length < 8) ||
                (this.player.GetRuolo() === "A" && squadraPropositrice.attaccanti.length < 6)
                ) &&
                this.isPlayerAssignable === false
                ){

                    // modifico i valori della squadra che sta prendendo, crediti
                    this.currentSquadraVincente = nomeSquadra;
                    this.SquadraVincente.updateText(this.currentSquadraVincente);
                    this.SquadraVincente.updateWidth();

                    this.currentQuota += value;
                    this.Crediti.updateText(this.currentQuota);
                    this.Crediti.updateWidth();
                    
                    this.SquadraVincente.updateOffsetX(windowWidth/4 + this.Crediti.GetWidth() + 20);
                    this.Assegna.updateOffsetX(windowWidth/4 + this.Crediti.GetWidth() + 90 + this.SquadraVincente.GetWidth());
                    this.timer.updateOffsetX(windowWidth/4 + this.Crediti.GetWidth() + 90 + this.SquadraVincente.GetWidth());

                    // resetto il timer
                    this.timer.startTimer();
            }
        }

    }

    // ASSEGNAPLAYER: chiamata quando schiaccio il tasto Assegna
    AssegnaPlayer(){
        // se la fanta squadra esiste assegno il giocatore
        if(this.player != null){
            for(var i = 0; i < this.teams.length; i++){
                if(this.teams[i].name === this.currentSquadraVincente){
                    this.player.SetCosto(this.currentQuota);
                    this.teams[i].AddPlayer(this.player);

                    // elimino il player dalla lista di ricerca
                    this.DeletePlayer(this.currentPlayer);

                    // resetto i dati
                    this.currentQuota = 0;
                    this.currentPlayer = "";
                    this.currentSquadra = "";
                    this.currentSquadraVincente = "";
                    this.player = null;

                    this.ResetDisplay();
                }
            }
        }        
    }

    // ASKFORASTA: chiamata per chiedere il file di asta da cui partire
    AskFileAsta(){
        const input = document.createElement("input");
        input.type = "file";
        input.accept = ".csv";

        input.addEventListener("change", (event) => {
            const file = event.target.files[0];

            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const text = event.target.result;
                    const lines = text.split("\n").map(line => line.trim()).filter(line => line.length > 0);

                    // Ignora prime 2 righe
                    const data = lines.slice(2);

                    const listaGiocatori = [];
                    const listaTeams = [];
                    const listaPrezzi = [];

                    data.forEach(line => {
                        const cells = line.split(",");

                        if (cells.length >= 3) {
                            listaTeams.push(cells[0].trim());
                            listaGiocatori.push(cells[1].trim());
                            listaPrezzi.push(parseFloat(cells[2].trim()));
                        }
                    });
                    console.log(listaGiocatori);
                    console.log(listaTeams);
                    console.log(listaPrezzi);
                    this.LoadAsta(listaTeams, listaGiocatori, listaPrezzi);
                };

                reader.readAsText(file);
            } else {
                alert("Nessun file selezionato.");
            }
        });

        input.click();
    }

    // LOADASTA: chiamata quando devo assegnare i giocatori di un'asta precedentemente iniziata
    LoadAsta(listaTeams, listaGiocatori, listaPrezzi){
        if(this.playersList != null){
            for(var i = 0; i < listaGiocatori.length; i++){
                for(var k = 0; k < this.playersList.length; k++){
                    console.log("players: " + this.playersList[k].ID + " " + listaGiocatori[i]);
                    if(this.playersList[k].ID == listaGiocatori[i]){
                        
                        for(var j = 0; j < this.teams.length; j++){
                            if(listaTeams[i] === this.teams[j].name){
                                console.log("ok 2: " + listaTeams[i]);
                                this.playersList[k].SetCosto(listaPrezzi[i]);
                                this.teams[j].AddPlayer(this.playersList[k]);
                                this.DeletePlayer(this.playersList[k].name);
                            }
                        }
                    }
                }
            }
        }
    }

    // DELETEPLAYER: chiamata quando devo eliminare un giocatore dal listone
    DeletePlayer(name) {
        for (let i = 0; i < this.playersList.length; i++) {
            if (this.playersList[i].GetName() === name) {
                this.playersList.splice(i, 1);
                this.checkSearch(true);
                return;
            }
        }        
    }

    // ADDTEAM: chiamata quando un client richiede di partecipare all'asta
    AddTeam(name){
        var exist = false;

        for(var i = 0; i < this.teams.length; i++){
            if(this.teams[i].GetName() === name){
                exist = true;
            }
        }

        if(!exist){
            this.teams.push(new Team(name));
        }
        else{
        }
    }

    // SELECTPLAYER: chiamata quando seleziono un giocatore dalla barra di ricerca
    SelectPlayer(player){
        // resetto le variabili dell'asta
        this.currentQuota = 0;
        this.currentPlayer = player.GetName();
        this.currentSquadra = player.GetSquadra();
        this.currentSquadraVincente = "";
        this.player = player;

        // aggiorno il layout per mostrare il giocatore selezionato
        this.ResetDisplay();

        //faccio ripartire il timer
        this.timer.startTimer();
        this.isPlayerAssignable = false;
    }

    // RESETDISPLAY: chiamata quando devo aggiornare il layout dell'asta
    ResetDisplay(){
        this.Crediti.updateText(this.currentQuota);
        this.PlayerName.updateText(this.currentPlayer);
        this.Squadra.updateText(this.currentSquadra);
        this.SquadraVincente.updateText(this.currentSquadraVincente);

        this.Squadra.updateOffsetX(windowWidth/4 + this.PlayerName.GetWidth() + 20)
        this.SquadraVincente.updateWidth();
        this.SquadraVincente.updateOffsetX(windowWidth/4 + this.Crediti.GetWidth() + 20);
        this.Assegna.updateOffsetX(windowWidth/4 + this.Crediti.GetWidth() + 90 + this.SquadraVincente.GetWidth());
        this.timer.updateOffsetX(windowWidth/4 + this.Crediti.GetWidth() + 90 + this.SquadraVincente.GetWidth());
    }

    // GENERATECSV: chiamata quando devo caricare i giocatori dei team sul csv
    GenerateCSV() {
        let csvContent = "";
        
        this.teams.forEach(team => {
            csvContent += team.GenerateListPlayers();
        });
        
        return csvContent;
    }

    // DOWNLOADCSV: chiamata quando devo generare il csv file dell'asta
    DownloadCSV(filename = "rose.csv") {
        const csvContent = this.GenerateCSV();
        const blob = new Blob([csvContent], { type: "text/csv" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // ASKFORFILE: chiamata quando devo caricare il file del listone
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
                    const sheetName = workbook.SheetNames[0];
                    const sheet = workbook.Sheets[sheetName];
    
                    // Converte il foglio in un array di oggetti
                    const parsedData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    
                    // Ignora le prime 2 righe
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
    
    // CREATEPLAYERS: chiamata quando devo mappare i dati in una lista con solo le determinate informazioni
    createPlayers(data) {
        return data.map(row => new Player(
            row[0] || 0,    // ID
            row[3] || "",   // Nome
            row[4] || "",   // Squadra
            row[1] || ""    // ruolo
        ));
    }
    
    // DEBUG: mostra i dati in console dei giocatori
    displayData(players) {
        console.log("Lista di Giocatori:");
        console.table(players);
    }

    // CHECK SE IL TESTO NELLA BARRA DI RICERCA E' CAMBIATO
    checkSearch(inputDoIt){
        if(inputDoIt || inputBox.value() !== this.previousValueText){
            if(this.playersList != null){
                this.previousValueText = inputBox.value();
                this.currentResearchList = this.searchPlayers(this.previousValueText, this.playersList);
                this.updateSearchList();
                
            }
        }
    }

    // AGGIORNO LA LISTA DEI MIEI COMPONENTI
    updateSearchList(){
        this.currentResearchComponents.length = 0;
        
        for(var i = 0; i < this.currentResearchList.length; i++){
            this.currentResearchComponents.push(new PlayerSearch(this.currentResearchList[i], 20));
        }        
    }

    // STAMPA DEI GIOCATORI CERCATI
    showSearchList(){
        var offset = 60;
        for(var i = 0; i < this.currentResearchComponents.length; i++){
            this.currentResearchComponents[i].show(windowWidth - 300, windowHeight/40 + offset);
            offset += 60;
        }
    }

    // RICERCA DEI DATI ALL'INTERNO DEL DATABASE DEI GIOCATORI
    searchPlayers(input, listPlayer) {
        if (!input || input.trim() === "") return [];
    
        input = input.toLowerCase().trim();
    
        // Calcola la somiglianza tra input e nome di ogni giocatore
        let results = listPlayer
            .map(player => {
                const playerName = player.name.toLowerCase().trim();
                const similarity = this.levenshteinDistance(input, playerName);
                const includesInput = playerName.includes(input) ? 0 : 1;
    
                return { player, score: similarity + includesInput };
            })
            .sort((a, b) => a.score - b.score)
            .slice(0, 5)
        
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
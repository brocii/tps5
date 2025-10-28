let stringa;
let righe = [];
let tabella = [];
let datiNumerici = [];
let json;
let dati;
let stringhe=[];

window.onload = leggi;



function leggi() {

    document.querySelector('select[onchange*="cognome"]').selectedIndex = 0;
    document.querySelector('select[onchange*="nome"]').selectedIndex = 0;
    
    const req = new XMLHttpRequest();
    req.open("GET",'5Einf.json',true);
    req.send();
    req.onload = function(){
    json = JSON.parse(req.responseText);
    console.log(json);
    inserisci(json);
    
}



   
}

function inserisci(file) {
    

    let tab = document.getElementById("tabella");
    tab.innerHTML = "";
    if(file.length==0){
        tab.innerHTML = "nessuno studente rispetta il paramentro inserito";
    }
    let intestazione = Object.keys(file[0]);
    let Header = tab.insertRow();
    for (let chiave of intestazione) {
        const cella = Header.insertCell();
        cella.innerHTML = `<b>${chiave}</b>`;
    }


    for (let i of file) {
        const riga = tab.insertRow();
        for (let chiave of intestazione) {
            const cella = riga.insertCell();
            cella.innerHTML = i[chiave];
        }
    }

   
   
}

function salvaStringhe(parametro, valore) {
   if (parametro === "nome") {
        document.querySelector('select[onchange*="cognome"]').selectedIndex = 0;
    }

    
    if (parametro === "cognome") {
        document.querySelector('select[onchange*="nome"]').selectedIndex = 0;
    }

        let rispettano = [];
        stringhe = []; 
        for (let i of json) {
            
            let stringa = i[parametro];  
            let id = i.elenco;               
            stringhe.push(stringa + "," + id);
        }

       
        for (let t of stringhe) {
            
            if (t.startsWith(valore)) {
                
                let splittato = t.split(",");
                let ids = splittato[1];

                for (let i of json) {
                    
                    if (String(i.elenco) === String(ids)) {
                        rispettano.push(i);
                    }
                }
            }
        }

        
        inserisci(rispettano);
    }


function minorenni(){
    document.querySelector('select[onchange*="cognome"]').selectedIndex = 0;
    document.querySelector('select[onchange*="nome"]').selectedIndex = 0;
            console.log(json);
            let età=[];
            for(let i of json){
                if(i.età<18){
                    età.push(i);
                }
            }
            inserisci(età)
            
        

}
function maggiorenni(){
    document.querySelector('select[onchange*="cognome"]').selectedIndex = 0;
    document.querySelector('select[onchange*="nome"]').selectedIndex = 0;
            console.log(json);
            let età=[];
            for(let i of json){
                if(i.età>=18){
                    età.push(i);
                }
            }
            inserisci(età)
            
        


}

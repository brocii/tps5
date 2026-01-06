let container = document.getElementById("prodotti");
let t=0;



function leggi() {
    caricaCategorieCSV()
    


    const req = new XMLHttpRequest();
    req.open("GET", "cappelli.json", true);
    req.onload = function () {
        let json = JSON.parse(req.responseText);
        caricaCategorieJSON(json);
    };
    req.send();

    
    const req1 = new XMLHttpRequest();
    req1.open("GET", "cappelli2.xml", true);
    req1.onload = function () {
        let xml = new DOMParser().parseFromString(req1.responseText, "text/xml");
        caricaCategorieXML(xml);
    };
    req1.send();
}

function caricaCategorieCSV() {
    let categoria="cappelli sportivi";
    
        creaCardCategoria(categoria);
    
}

function caricaCategorieJSON(file) {
    for (let categoria in file) {
        creaCardCategoria(categoria);
    }
}

function caricaCategorieXML(xml) {
    let categorie = xml.getElementsByTagName("categoria");
    console.log(categorie);
    for (let categoria of categorie) {
        let nome = categoria.getAttribute("nome");
        console.log(nome);
        creaCardCategoria(nome);
    }
}

 function creaCardCategoria(categoria) {

    let categoriaDiv = document.createElement("div");
    categoriaDiv.classList.add("row");
    t+=1;

    let col0 = document.createElement("div");
    col0.classList.add("col-md-2", "mb-4");

    let col1 = document.createElement("div");
    col1.classList.add("col-md-8", "mb-4");

    let col2 = document.createElement("div");
    col2.classList.add("col-md-2", "mb-4");

    let card = document.createElement("div");
    card.classList.add("card", "mx-auto", "shadow-lg");
    card.style.width = "100%";

    let img = document.createElement("img");
    img.classList.add("card-img-top");

    switch(categoria){
        case"cappelli sportivi":
            img.src="1.png";
            break;
        case"cappelli eleganti":
            img.src="2.png";
            break;
        case"cappelli casual":
            img.src="3.png";
            break;
        case "cappelli invernali":
            img.src="4.png";
            break;
        case"cappelli estivi":
            img.src="5.png";
            break;
    }                    
    let testoCard = document.createElement("div");
    testoCard.classList.add("card-body");

    let title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = categoria;

    let link = document.createElement("a");
    link.href = "categorie.html";
    link.classList.add("btn", "btn-primary", "stretched-link");
    link.textContent = "Scopri i prodotti";

    link.addEventListener("click", () => {
        localStorage.setItem("categoriaSelezionata", categoria);
    });

    testoCard.append(img, title, link);
    card.append(testoCard);
    col1.append(card);
    categoriaDiv.append(col0, col1, col2);

    container.appendChild(categoriaDiv);
}



function caricaProdotti() {
 let categoria = localStorage.getItem("categoriaSelezionata");

if (categoria === "cappelli invernali" || categoria === "cappelli estivi") {
    const req0 = new XMLHttpRequest();
    req0.open("GET", "cappelli2.xml", true);

    req0.onload = function () {
        let dati = new DOMParser().parseFromString(req0.responseText, "text/xml");
        let container = document.getElementById("prodotti");
        let prodotti0 = dati.getElementsByTagName("categoria");
        let prodotto0;
        if (categoria === "cappelli invernali") {
            prodotto0 = prodotti0[0].getElementsByTagName("prodotto");
        } else if (categoria === "cappelli estivi") {
            prodotto0 = prodotti0[1].getElementsByTagName("prodotto");
        }

        for (let i = 0; i < prodotto0.length; i++) {
            const oggettoProdotto = {
                immagine: prodotto0[i].getElementsByTagName("immagine")[0].textContent,
                marca: prodotto0[i].getElementsByTagName("marca")[0].textContent,
                modello: prodotto0[i].getElementsByTagName("modello")[0].textContent,
                descrizione: prodotto0[i].getElementsByTagName("descrizione")[0].textContent,
                prezzo: prodotto0[i].getElementsByTagName("prezzo")[0].textContent
            };
            creaCard(container, oggettoProdotto);
        }
    };
    req0.send();
}


if (categoria === "cappelli eleganti" || categoria === "cappelli casual") {
    const req = new XMLHttpRequest();
    req.open("GET", "cappelli.json", true);
    req.onload = function () {
        let dati = JSON.parse(req.responseText);
        let container = document.getElementById("prodotti");
        let prodotti = dati[categoria];

        for (let prodotto of prodotti) {
            creaCard(container, prodotto);
        }
    };
    req.send();
}

if (categoria === "cappelli sportivi") { 
    const reqCSV = new XMLHttpRequest();
    reqCSV.open("GET", "cappelliSportivi.csv", true);
    reqCSV.onload = function () {
        let container = document.getElementById("prodotti");
        let linee = reqCSV.responseText.split("\n"); 
        let header = linee[0].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g); 

        let prodotti = [];
        for (let i = 1; i < linee.length; i++) {
            let info = linee[i].match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);
            
            const articolo = {};
            for (let j = 0; j < header.length; j++) {
                articolo[header[j].trim()] = info[j].trim().replace(/^"|"$/g, "");
            }
            prodotti.push(articolo);
        }

        for (let prodotto of prodotti) {
            creaCard(container, prodotto);
        }
    };
    reqCSV.send();
}



function creaCard(container, prodotto) {
    let col = document.createElement("div");
    col.classList.add("col-md-4", "mb-4");

    let card = document.createElement("div");
    card.classList.add("card", "mx-auto", "shadow-lg", "card-img-container");

    let img = document.createElement("img");
    img.src = prodotto.immagine;
    img.classList.add("card-img-top");
    img.alt = `Immagine di ${prodotto.modello}`;

    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");

    let title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = prodotto.modello;

    let marca = document.createElement("p");
    marca.classList.add("card-text");
    marca.textContent = prodotto.marca;

    let btn = document.createElement("button");
    btn.classList.add("btn", "btn-primary");
    btn.textContent = prodotto.prezzo;
    btn.addEventListener("click", () => {
        localStorage.setItem("prodottoSelezionato", JSON.stringify(prodotto));
        window.location.href = "dettaglio.html";
    });
    

    cardBody.append(title, marca, btn);
    card.append(img, cardBody);
    col.append(card);
    container.append(col);
}
}
let prodottiConfronto = JSON.parse(localStorage.getItem("prodottiConfronto")) || [];
function confronto(prodotto) {
   
     for(prodotti of prodottiConfronto){
        if(prodotti.modello===prodotto.modello){
            aggiornaTabellaConfronto()
            return;
        }}
    prodottiConfronto.push(prodotto);

    localStorage.setItem("prodottiConfronto", JSON.stringify(prodottiConfronto));
    aggiornaTabellaConfronto();
}


function aggiornaTabellaConfronto() {
    let tabella = document.getElementById("tabella1");
    prodottiConfronto=JSON.parse(localStorage.getItem("prodottiConfronto")) ;

    let tbody = tabella.getElementsByTagName("tbody")[0];
     tbody.innerHTML = "";

    for (let p of prodottiConfronto) {
        let riga = document.createElement("tr");
        riga.innerHTML = `
            <td>${p.marca}</td>
            <td>${p.modello}</td>
            <td>${p.prezzo}</td>
            <td><img src="${p.immagine}" alt="${p.modello}" width="50"></td>
            <td>${p.descrizione}</td>
        `;
        tbody.appendChild(riga);
    }
}



function mostraDettagliProdotto(){
    let info = localStorage.getItem('prodottoSelezionato');
    let prodotto=JSON.parse(info);
    let div=document.getElementById("dettagli")
    let immagine = document.getElementById("immagine");
    immagine.src = prodotto.immagine;
    div.append(immagine);
    document.getElementById("marca").innerHTML=`marca:  ${prodotto.marca}`;
    document.getElementById("modello").innerHTML=`modello:  ${prodotto.modello}`;
    document.getElementById("descrizione").innerHTML=`  ${prodotto.descrizione}`;
    document.getElementById("prezzo").innerHTML = `Prezzo:  ${prodotto.prezzo}`;
    document.getElementById("tastoCarrello").addEventListener("click", () => {
        
        aggiungiCarrello(prodotto)});


    document.getElementById("btnConfronta").addEventListener("click", function() {
        confronto(prodotto);
    });
    document.getElementById("annulla").addEventListener("click", function() {
        prodottiConfronto = [];
        localStorage.setItem("prodottiConfronto", JSON.stringify(prodottiConfronto));
        aggiornaTabellaConfronto();
    });
    }



document.addEventListener("DOMContentLoaded", function() {
    if (window.location.pathname.includes("dettaglio.html")) {
        mostraDettagliProdotto();
    } else if (window.location.pathname.includes("categorie.html")) {
        caricaProdotti();

    }
else if(window.location.pathname.includes("vetrina.html")){
    leggi();
}});



function aggiungiCarrello(prodotto) {
    
    let carrelloJSON = localStorage.getItem("carrello");
    let carrello;

    if (!carrelloJSON) {
        carrello = [];
    }
    else {
        carrello = JSON.parse(carrelloJSON); 
        
    }
    

    carrello.push(prodotto);
    localStorage.setItem("carrello", JSON.stringify(carrello));

    alert(prodotto.modello + " è stato aggiunto al carrello!");
}
function mostraCarrello() {
    let tot=0;
    
    const tab = document.getElementById("tabella").getElementsByTagName("tbody")[0];
    tab.innerHTML = "";
  
    const carrello = JSON.parse(localStorage.getItem("carrello")) || [];
  
    if (carrello.length == 0) {
      const riga = tab.insertRow();
      const cella = riga.insertCell(0);
    
      cella.innerHTML = "Il carrello è vuoto.";
      cella.classList.add("text-center");
      return;
    }
  
    for (let i = 0; i < carrello.length; i++) {
      const prodotto = carrello[i];
      const riga = tab.insertRow();
      let prezzo = parseFloat(prodotto.prezzo.replace("€", "").trim());
      tot += prezzo;
  
      const cellaIndice = riga.insertCell(0);
      cellaIndice.textContent = i + 1;

      const cellaImmagine = riga.insertCell(1);
      cellaImmagine.innerHTML = `<img src="${prodotto.immagine}" alt="${prodotto.modello}" width="50">`;
  
      const cellaModello = riga.insertCell(2);
      cellaModello.textContent = prodotto.modello;
  
      const cellaPrezzo = riga.insertCell(3);
      cellaPrezzo.textContent = prodotto.prezzo;


    
    }
    localStorage.setItem("prezzoTOT",tot)
    document.getElementById("totale").innerHTML="il prezzo totale è:   "+tot+"€";

  }


  async function generaRicevuta() {
    let totale=localStorage.getItem("prezzoTOT")
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    
    const carrello = JSON.parse(localStorage.getItem("carrello")) || [];
    

    doc.setFontSize(16);
    doc.text("Ricevuta acquisto - HatHub", 20, 10);
    doc.setFontSize(12);
    let y = 20;

    carrello.forEach(prodotto => {
         doc.text(` - ${prodotto.modello} - ${prodotto.marca}-${prodotto.prezzo} `,20,y);
         y+=10;
    });
    doc.setFontSize(16);
    doc.text(`Totale:${totale}€`,20,y+10);


    doc.save("ricevuta.pdf");
    localStorage.setItem("carrello",[])
  }

  


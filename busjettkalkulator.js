// Henter tak i HTML-elementene vi trenger, ved hjelp av deres id
const form = document.getElementById("budsjettForm");        // Selve skjemaet (for å legge til nye poster)
const list = document.getElementById("budsjettListe");        
const empty = document.getElementById("tomListe");            // Melding som vises når listen er tom
const totalInntekt = document.getElementById("totalInntekt"); // Sted der total inntekt vises
const totalUtgift = document.getElementById("totalUtgift");   // Sted der total utgift vises
const saldo = document.getElementById("saldo");               // Sted der saldo (inntekt - utgift) vises
 
// Denne "arrayen" (listen) holder styr på alle budsjettpostene vi har lagt inn.
// Hver post er et objekt med navn, beløp, type (inntekt/utgift) og en id.
let poster = [];
 
// Funksjon som formaterer et tall til norsk valuta, f.eks. 1500 -> "1 500,00 kr"
function formatMoney(x) {
  return new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK" }).format(x);
}
 
// Denne funksjonen kjøres hver gang noe endres (ny post lagt til, eller post slettet).
// Den regner ut totaler og bygger listen på nytt i HTML-en.
function oppdater() {
  let inntekter = 0; // Summen av alle inntekter
  let utgifter = 0;  // Summen av alle utgifter
 
  // Går gjennom hver post i "poster"-listen og legger til riktig sum
  poster.forEach((p) => {
    if (p.type === "inntekt") inntekter += p.belop;
    else utgifter += p.belop;
  });
 
  // Oppdaterer teksten i HTML-en med de nye summene
  totalInntekt.textContent = formatMoney(inntekter);
  totalUtgift.textContent = formatMoney(utgifter);
  saldo.textContent = formatMoney(inntekter - utgifter); // Saldo = det som er igjen
 
  // Tømmer listen i HTML-en, slik at vi kan bygge den på nytt
  list.innerHTML = "";
 
  // Hvis det ikke finnes noen poster ennå, vis "tom liste"-meldingen og stopp funksjonen her
  if (!poster.length) {
    empty.style.display = "block";
    return;
  }
 
  // Hvis det finnes poster, skjul "tom liste"-meldingen
  empty.style.display = "none";
 
  // Går gjennom hver post og lager et nytt listeelement (li) for den
  poster.forEach((p) => {
    const item = document.createElement("li"); // Lager et nytt <li>-element
    item.className = "post";                   // Gir det en CSS-klasse for styling
 
    // Setter innholdet i listeelementet: navn, type, beløp (med + eller -) og en slett-knapp
    item.innerHTML = `<div><strong>${p.navn}</strong><small>${p.type === "inntekt" ? "Inntekt" : "Utgift"}</small></div><span>${p.type === "inntekt" ? "+" : "-"}${formatMoney(p.belop)}</span><button data-id="${p.id}">Slett</button>`;
 
    // Legger det nye listeelementet inn i listen på siden
    list.appendChild(item);
  });
 
  // Finner alle slett-knappene og legger til en "klikk"-funksjon på hver av dem
  document.querySelectorAll("button[data-id]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      // Henter id-en til posten som skal slettes (id ligger lagret som tekst, gjøres om til tall)
      const id = Number(e.target.dataset.id);
 
      // Lager en ny liste UTEN posten som har denne id-en (altså: sletter den)
      poster = poster.filter((p) => p.id !== id);
 
      // Oppdaterer siden på nytt siden listen har endret seg
      oppdater();
    });
  });
}
 
// Denne kodeblokken kjører hver gang brukeren trykker "Send inn" (submit) på skjemaet
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Hindrer at siden laster på nytt (standard oppførsel ved submit)
 
  // Henter verdiene brukeren har skrevet inn i skjemaet
  const navn = document.getElementById("navn").value.trim();  // Navnet på posten (fjerner mellomrom rundt)
  const belop = Number(document.getElementById("belop").value); // Beløpet, gjort om til tall
  const type = document.getElementById("type").value;         // Type: "inntekt" eller "utgift"
 
  // Sjekker at alt er fylt ut riktig. Hvis ikke: vis en advarsel og stopp funksjonen
  if (!navn || belop <= 0 || !type) {
    alert("Fyll ut alle feltene.");
    return;
  }
 
  // Legger til en ny post i "poster"-listen
  // Date.now() brukes som en enkel og unik id (millisekunder siden 1970)
  poster.push({ id: Date.now(), navn, belop, type });
 
  form.reset();  // Tømmer skjemaet slik at brukeren kan legge inn en ny post
  oppdater();    // Oppdaterer siden med den nye posten
});
 
oppdater();
let inntekt = 0;
let utgift = 0;

function leggTil() {

    let navn = document.getElementById("navn").value;
    let belop = Number(document.getElementById("belop").value);
    let type = document.getElementById("type").value;

    if (navn == "" || belop == 0 || type == "") {
        alert("Fyll inn alt!");
        return;
    }

    // Legger til penger
    if (type == "inntekt") {
        inntekt = inntekt + belop;
    }

    if (type == "utgift") {
        utgift = utgift + belop;
    }

    // Viser tallene
    document.getElementById("inntekt").textContent = inntekt;
    document.getElementById("utgift").textContent = utgift;
    document.getElementById("saldo").textContent = inntekt - utgift;

    // Lager en ny post
    let nyPost = document.createElement("li");

    nyPost.textContent = navn + " - " + belop + " kr - " + type;

    document.getElementById("liste").appendChild(nyPost);

    // Tømmer feltene
    document.getElementById("navn").value = "";
    document.getElementById("belop").value = "";
    document.getElementById("type").value = "";
}
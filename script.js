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

    if (type == "inntekt") {
        inntekt = inntekt + belop;
    }

    if (type == "utgift") {
        utgift = utgift + belop;
    }

    document.getElementById("inntekt").textContent = inntekt;
    document.getElementById("utgift").textContent = utgift;
    document.getElementById("saldo").textContent = inntekt - utgift;

    let nyPost = document.createElement("li");

    nyPost.textContent = navn + " - " + belop + " kr - " + type;

    document.getElementById("liste").appendChild(nyPost);

    document.getElementById("navn").value = "";
    document.getElementById("belop").value = "";
    document.getElementById("type").value = "";
}

const skjema = document.getElementById("budsjettForm");
const liste = document.getElementById("budsjettListe");
const tomMelding = document.getElementById("tomListe");
const inntektTekst = document.getElementById("totalInntekt");
const utgiftTekst = document.getElementById("totalUtgift");
const saldoTekst = document.getElementById("saldo");

let poster = [];

function formaterPenger(belop) {
	return belop.toLocaleString("nb-NO", {
		style: "currency",
		currency: "NOK"
	});
}

function oppdaterSide() {
	let inntekter = 0;
	let utgifter = 0;

	poster.forEach(post => {
		if (post.type === "inntekt") {
			inntekter += post.belop;
		} else {
			utgifter += post.belop;
		}
	});

	inntektTekst.textContent = formaterPenger(inntekter);
	utgiftTekst.textContent = formaterPenger(utgifter);
	saldoTekst.textContent = formaterPenger(inntekter - utgifter);
	tomMelding.style.display = poster.length ? "none" : "block";

	liste.innerHTML = poster.map((post, index) => `
		<li class="post">
			<div><strong>${post.navn}</strong><small>${post.type}</small></div>
			<span>${post.type === "inntekt" ? "+" : "-"}${formaterPenger(post.belop)}</span>
			<button onclick="slettPost(${index})">Slett</button>
		</li>
	`).join("");
}

skjema.addEventListener("submit", function (event) {
	event.preventDefault();

	const navn = document.getElementById("navn").value;
	const belop = Number(document.getElementById("belop").value);
	const type = document.getElementById("type").value;

	poster.push({ navn: navn, belop: belop, type: type });
	skjema.reset();
	oppdaterSide();
});

function slettPost(index) {
	poster.splice(index, 1);
	oppdaterSide();
}

oppdaterSide();

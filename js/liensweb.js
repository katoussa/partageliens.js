/* 
Activité 1
*/

// Liste des liens Web à afficher. Un lien est défini par :
// - son titre
// - son URL
// - son auteur (la personne qui l'a publié)
var listeLiens = [
    {
        titre: "So Foot",
        url: "http://sofoot.com",
        auteur: "yann.usaille"
    },
    {
        titre: "Guide d'autodéfense numérique",
        url: "http://guide.boum.org",
        auteur: "paulochon"
    },
    {
        titre: "L'encyclopédie en ligne Wikipedia",
        url: "http://Wikipedia.org",
        auteur: "annie.zette"
    }
];

// TODO : compléter ce fichier pour ajouter les liens à la page web

// Crée et renvoie un élément DOM affichant les données d'un lien
// Le paramètre lien est un objet JS représentant un lien
function creerElementLien(lien) {
	var titreElt = document.createElement("a");
	titreElt.href = lien.url;
	titreElt.style.color = "#428bca";
	titreElt.style.textDecoration = "none";
	titreElt.style.marginRight = "5px";
	titreElt.appendChild(document.createTextNode(lien.titre));

	var urlElt = document.createElement("span");
	urlElt.appendChild(document.createTextNode(lien.url));

	// Cette ligne contient le titre et l'URL du lien
	var ligneTitreElt = document.createElement("h4");
	ligneTitreElt.style.margin = "0px";
	ligneTitreElt.appendChild(titreElt);
	ligneTitreElt.appendChild(urlElt);

	// Cette ligne contient l'auteur
	var ligneDetailsElt = document.createElement("span");
	ligneDetailsElt.appendChild(document.createTextNode("Ajouté par " + lien.auteur));

	var divLienElt = document.createElement("div");
	divLienElt.classList.add("lien");
	divLienElt.appendChild(ligneTitreElt);
	divLienElt.appendChild(ligneDetailsElt);

	return divLienElt;
}

function getElt(url, callback) {
	var req = new XMLHttpRequest();
	req.open("GET", url);
	req.addEventListener("load", function () {
		if (req.status >= 200 && req.status < 400) {
			// Appelle la fonction callback en lui passant la réponse de la requête
			callback(req.responseText);
		} else {
			console.error(req.status + " " + req.statusText + " " + url);
		}
	});
	req.addEventListener("error", function () {
		console.error("Erreur réseau avec l'URL " + url);
	});
	req.send(null);
}

getElt(" https://oc-jswebsrv.herokuapp.com/api/liens", function (lien) {
	var contenuElt = document.getElementById("contenu");
	// Parcours de la liste des liens et ajout d'un élément au DOM pour chaque lien
	listeLiens.forEach(function (lien) {
		var lienElt = creerElementLien(lien);
		contenuElt.appendChild(lienElt);
	});
});

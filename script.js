// Fonction pour charger les consoles avec les paramètres sélectionnés
function chargerConsoles() {
    // Récupérer les valeurs des filtres actifs
    const generationActive = document.querySelector('.gen-button.active')?.dataset.generation ;
    const decennieActive = document.querySelector('.dec-button.active')?.dataset.decennie;
    const constructeurActive = document.getElementById('constructeur-select').value || 'tous';
    const typeConsoleActive = document.querySelector('.typeconsole-button.active')?.dataset.typeconsole;
    const column = document.querySelector('.tri-button.active')?.dataset.column || 'annee_sortie';
    const order = document.querySelector('.tri-button.active')?.dataset.order || 'asc';

    console.log('Generation:', generationActive, 'Decennie:', decennieActive, 'Constructeur:', constructeurActive, 'TypeConsole:', typeConsoleActive, 'Column:', column, 'Order:', order);

    const url = `traitement.php?column=${column}&order=${order}&generation=${generationActive}&decennie=${decennieActive}&constructeur=${constructeurActive}&type_console=${typeConsoleActive}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log('Données reçues:', data);
            if (Array.isArray(data.consoles)) {
                afficherConsoles(data.consoles); // Affiche les consoles
            }
            if (Array.isArray(data.constructeurs)) {
                afficherConstructeurs(data.constructeurs); // Affiche les constructeurs dans le select
            }
        })
        .catch(error => console.log('Erreur lors de la récupération des données:', error));
}


// Afficher les consoles dans la div console-list
function afficherConsoles(data) {
    const consoleList = document.getElementById('console-list');
    consoleList.innerHTML = ''; // Vide le contenu de la liste avant de la remplir

    // verifie si la liste des consoles est vide
    if (data.length === 0) {
        const message = document.createElement('p');
        message.textContent = 'Aucune console dans la liste';
        consoleList.appendChild(message);
    } else {
        // Si des consoles existent, on les affiche
        data.forEach(console => {
            const consoleDiv = document.createElement("div");
            consoleDiv.classList.add("console");
            consoleDiv.innerHTML = `
            <div class="console-container">
                <div class="console-image">
                    <img src="img/${console.image_url}" alt="${console.nom}" loading="lazy" />
                </div>
                <div class="console-details">
                    <h3>${console.nom}</h3>
                    <div class="console-info">
                        <p class="console-year"><strong>${console.annee_sortie}</strong>, ${console.marque}</p>
                        <p class="console-type"><em>${console.type_console}</em></p>
                        <p class="console-desc">${console.description}</p>
                    </div>
                </div>
            </div>
        `;
            consoleList.appendChild(consoleDiv);
        });
    }
}

// Affiche les constructeurs dans le select de la page
function afficherConstructeurs(data) {
    const constructeurList = document.getElementById('constructeur-select');
    const selectedConstructeur = constructeurList.value; // Récupère la valeur sélectionnée avant de réinitialiser

    // Vide le select avant de le remplir
    const options = Array.from(constructeurList.options);
    options.forEach(option => option.remove()); 

    // Option "Tous"
    const optionTous = document.createElement('option');
    optionTous.value = 'tous';
    optionTous.textContent = 'Tous';
    constructeurList.appendChild(optionTous);

    // Si les donnees de constructeurs sont valides
    if (Array.isArray(data) && data.length > 0) {
        data.forEach(constructeur => {
            const option = document.createElement('option');
            option.value = constructeur;
            option.textContent = constructeur;
            constructeurList.appendChild(option);
        });
    }

    // Restaurer la sélection précédente si elle existe dans la nouvelle liste
    if (selectedConstructeur && constructeurList.querySelector(`option[value="${selectedConstructeur}"]`)) {
        constructeurList.value = selectedConstructeur;
    }
}

// Fonction générique pour gérer les clics sur les boutons (tri, génération, décennie)
function handleButtonClick(event, type) {

    //On retire la classe active à tous les bouton du type
    document.querySelectorAll(`.${type}-button`).forEach(button => button.classList.remove('active'));

    // On ajoute la classe active au bouton cliqué
    event.target.classList.add('active');

    // Extraire les données column et order du bouton cliqué
    const column = event.target.dataset.column;
    const order = event.target.dataset.order;

    chargerConsoles();
    updateTitleRight();
}

// Fonction pour réinitialiser les filtres
function resetFiltre() {
    document.querySelectorAll('.gen-button, .dec-button, .typeconsole-button, .tri-button').forEach(button => {
        button.classList.remove('active'); // Retirer la classe active de tous les boutons
    });

    const constructeurSelect = document.getElementById('constructeur-select');
    constructeurSelect.value = 'tous'; 
;
    // Ajouter la classe active au premier bouton de tri par défaut 
    document.querySelector('.tri-button[data-column="annee_sortie"][data-order="asc"]').classList.add('active');
    document.querySelector('.gen-button[data-generation="0"]').classList.add('active');
    document.querySelector('.dec-button[data-decennie="0"]').classList.add('active');
    document.querySelector('.typeconsole-button[data-typeconsole="tous"]').classList.add('active');

    chargerConsoles();
}

const titleRight = document.querySelector('.title-right p');

// En fonction de la génération sélectionnée, un petit texte s'affiche et décrit le contexte entourant la génération de console
function updateTitleRight() {
    const activeButton = document.querySelector('.gen-button.active');
    const generation = activeButton.dataset.generation;

    let text;
    if (generation === "1") {
        text = "La première génération de consoles marque les balbutiements de l'industrie du jeu vidéo, avec des innovations techniques qui posent les bases de ce qui deviendra un secteur mondial. La Magnavox Odyssey, sortie en 1972, est la première console domestique, utilisant des cartes pour sélectionner les jeux. Peu après, des consoles dédiées comme le Pong d’Atari envahissent les salons, popularisant les jeux vidéo au grand public. Ces machines, très limitées techniquement, affichent des graphismes monochromes minimalistes et des jeux simples, souvent inspirés des sports. L'industrie reste naissante et fragmentée, dominée par des entreprises pionnières qui expérimentent encore avec le potentiel de cette nouvelle forme de divertissement.";
    } else if (generation === "2") {
        text = "Avec l’arrivée des cartouches interchangeables, la deuxième génération transforme le paysage vidéoludique. Des consoles comme l’Atari 2600, la ColecoVision ou l’Intellivision permettent aux joueurs de choisir parmi une bibliothèque croissante de jeux, diversifiant les expériences disponibles. Les graphismes s’améliorent légèrement, intégrant des couleurs et des environnements plus élaborés. Cependant, la fin de cette génération est marquée par la crise de 1983, un effondrement de l'industrie provoqué par une surabondance de jeux de mauvaise qualité et une concurrence mal gérée. Cet événement pousse plusieurs entreprises à quitter le marché, laissant une opportunité à d'autres, comme Nintendo, de redéfinir l’industrie";
    } else if (generation === "3") {
        text = "Cette génération est souvent considérée comme l’âge d’or des jeux vidéo, marquant la fin de la crise et l’émergence de standards modernes. La Nintendo Entertainment System (NES) et la Sega Master System dominent le marché avec des graphismes 8 bits révolutionnaires pour l’époque, capables de proposer des mondes plus détaillés et colorés. Nintendo impose également des règles strictes de contrôle de qualité, limitant les dérives qui avaient causé la crise précédente. L'industrie connaît une croissance spectaculaire, s'étendant au-delà des simples jeux d'arcade pour offrir des expériences immersives comme Super Mario Bros. ou The Legend of Zelda. Les consoles deviennent des produits culturels, redéfinissant le jeu vidéo comme un loisir incontournable.";
    } else if (generation === "4") {
        text = "La quatrième génération est celle de l’essor des graphismes en 16 bits et de la montée en puissance des rivalités dans l’industrie. Nintendo, avec sa Super Nintendo Entertainment System (SNES), et Sega, avec sa Mega Drive (Genesis), se disputent les joueurs à coups de licences iconiques et de campagnes marketing agressives. Les graphismes deviennent plus riches et détaillés, tandis que les bandes-son profitent des avancées techniques pour offrir des compositions mémorables. Des titres comme The Legend of Zelda: A Link to the Past, Sonic the Hedgehog ou encore Street Fighter II redéfinissent les genres et attirent un public de plus en plus large. L’industrie se structure autour de ces deux géants, et le jeu vidéo devient une force culturelle mondiale.";
    } else if (generation === "5") {
        text = "La cinquième génération marque une rupture technologique avec l’apparition des graphismes en 3D et des jeux sur CD-ROM, permettant des expériences plus vastes et immersives. C’est également l’entrée de Sony dans l’arène avec sa PlayStation, qui rencontre un succès phénoménal, surpassant la Sega Saturn et la Nintendo 64 sur de nombreux marchés. Les jeux comme Final Fantasy VII, Tomb Raider ou Metal Gear Solid repoussent les limites narratives et techniques, offrant des récits plus matures et des mondes ouverts. Cette génération transforme l’industrie en un secteur de masse où innovation et créativité dictent les tendances.";
    } else if (generation === "6") {
        text = "La sixième génération introduit des graphismes en haute définition et popularise les jeux en ligne. La PlayStation 2, véritable phénomène mondial, s’impose comme la console la plus vendue de l’histoire, tandis que Microsoft entre dans la course avec sa Xbox, mettant en avant le jeu en ligne avec Xbox Live. La Nintendo GameCube cherche à séduire un public familial, mais reste en retrait face à la concurrence. Des jeux comme Halo, Grand Theft Auto III ou The Legend of Zelda: The Wind Waker illustrent la diversité croissante des expériences proposées, mêlant gameplay innovant, narration complexe et design visuel impressionnant. Cette période pose également les bases des modèles économiques modernes, comme le DLC et les abonnements en ligne.";
    } else if (generation === "7") {
        text = "La septième génération marque un tournant majeur dans l’histoire du jeu vidéo, avec une adoption massive de la haute définition et une connectivité accrue. La Xbox 360, lancée en 2005, popularise le multijoueur en ligne grâce à un Xbox Live enrichi, tandis que la PlayStation 3 mise sur une puissance de calcul impressionnante et le lecteur Blu-ray. Nintendo, de son côté, opte pour une approche radicalement différente avec la Wii, qui démocratise le jeu vidéo auprès d’un public non initié grâce à son gameplay basé sur la détection de mouvements. Des titres comme Uncharted 2: Among Thieves, The Elder Scrolls V: Skyrim, et Wii Sports témoignent de la diversité des expériences, entre prouesses techniques et accessibilité. C’est également à cette époque que les modèles freemium et les microtransactions commencent à émerger, transformant profondément l’économie du secteur.";
    } else if (generation === "8") {
        text = "La huitième génération, amorcée en 2012, se concentre sur des expériences connectées et immersives. La PlayStation 4 et la Xbox One mettent l’accent sur les services dématérialisés et le cloud gaming, tandis que la Nintendo Switch, en 2017, réinvente la console hybride en offrant une expérience à la fois portable et de salon. Les avancées graphiques se combinent à des mondes ouverts d’une richesse inédite, comme en témoignent des œuvres telles que The Witcher 3: Wild Hunt, Horizon Zero Dawn ou encore Breath of the Wild. C’est également la montée en puissance des plateformes de streaming, et l’e-sport devient un phénomène mondial. Cette période voit un virage vers une personnalisation accrue des expériences, entre réalité virtuelle et ray tracing.";
    } else if (generation === "9") {
        text = "La neuvième génération, amorcée en 2020 avec la PlayStation 5 et les Xbox Series X/S, marque une avancée technique majeure avec la 4K native, le ray tracing et des SSD qui révolutionnent les temps de chargement. Parallèlement, le cloud gaming, bien que freiné par des infrastructures inégales, gagne en maturité avec des services comme Xbox Cloud Gaming. La Nintendo Switch, toujours incontournable malgré son appartenance à la huitième génération, maintient sa popularité, tandis que les rumeurs sur son successeur alimentent l’enthousiasme. Cette génération, toutefois, fait face à des défis tels que la pénurie mondiale de composants, sans freiner la créativité des éditeurs ni l’immersion offerte aux joueurs.";
    } else {
        text = `Avec les évolutions rapides du jeu vidéo et les avancées technologiques qui redéfinissent sans cesse l’expérience des joueurs, il est parfois utile de regarder en arrière. Comprendre l’histoire des consoles permet de mieux saisir comment nous en sommes arrivés aux innovations d’aujourd’hui et ce que cela peut présager pour l’avenir. Des premiers pas de l’industrie aux générations actuelles, en passant par les révolutions techniques et culturelles, cette encyclopédie vous offre une vue d’ensemble claire et accessible. Que vous soyez curieux ou passionné, explorez l’évolution des consoles pour découvrir ce qui a façonné, et continue de façonner, cet univers fascinant.`;
    }
    
    titleRight.textContent = text;
}

document.querySelector('.reset-btn').addEventListener('click', resetFiltre);


// Gère quand un bouton cliqué devient actif (change d'apparence)
document.querySelectorAll('.tri-button').forEach(button =>
    button.addEventListener('click', event => handleButtonClick(event, 'tri'))
);

document.querySelectorAll('.gen-button').forEach(button =>
    button.addEventListener('click', event => handleButtonClick(event, 'gen'))
);

document.querySelectorAll('.dec-button').forEach(button =>
    button.addEventListener('click', event => handleButtonClick(event, 'dec'))
);

document.querySelectorAll('.typeconsole-button').forEach(button =>
    button.addEventListener('click', event => handleButtonClick(event, 'typeconsole'))
);

document.getElementById('constructeur-select').addEventListener('change', () => {
    chargerConsoles(); 
});


const scrollToTopBtn = document.getElementById("scrollToTopBtn");

// Affiche ou cache le bouton en fonction de la position de scroll
window.onscroll = function() {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        scrollToTopBtn.style.display = "block"; 
    } else {
        scrollToTopBtn.style.display = "none"; 
    }
};

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

window.onload = () => {
    chargerConsoles();
    updateTitleRight(); 
};

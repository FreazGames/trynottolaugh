const startButton = document.getElementById("start-btn");
const message = document.getElementById("message");
const linkSection = document.getElementById("link-section");
const gameLink = document.getElementById("game-link");
const copyButton = document.getElementById("copy-btn");

let gameStarted = false;
let soundsQueue = []; 

// Liste des sons
const sounds = [
    "https://www.myinstants.com/media/sounds/allez-le-nwar.mp3",
    "https://www.myinstants.com/media/sounds/vine-boom-sound.mp3",
    "https://www.myinstants.com/media/sounds/fart.mp3",
    "https://www.myinstants.com/media/sounds/boo-tu-as-peur-nai-pas-peur.mp3",
    "https://www.myinstants.com/media/sounds/anime-ahh.mp3",
    "https://www.myinstants.com/media/sounds/death-sound-fortnite.mp3",
    "https://www.myinstants.com/media/sounds/sad-meow-song.mp3",
    "https://www.myinstants.com/media/sounds/tas-la-dalle-et-tas-envie-de-ken.mp3",
    "https://www.myinstants.com/media/sounds/enfant-du-rn.mp3",
    "https://www.myinstants.com/media/sounds/hugooo.mp3",
    "https://www.myinstants.com/media/sounds/arretez-denvoyer-les-messages.mp3",
    "https://www.myinstants.com/media/sounds/fils-de-puteuuuu.mp3",
    "https://www.myinstants.com/media/sounds/sigma-boy.mp3",
    "https://www.myinstants.com/media/sounds/un-ptit-wrap.mp3",
    "https://www.myinstants.com/media/sounds/le-cailloux.mp3",
    "https://www.myinstants.com/media/sounds/galaxy-meme.mp3",
    "https://www.myinstants.com/media/sounds/chill-guy.mp3",
    "https://www.myinstants.com/media/sounds/ouvre-la-porte.mp3",
    "https://www.myinstants.com/media/sounds/zemmour-tousse.mp3",
    "https://www.myinstants.com/media/sounds/metal-pipe-clang.mp3",
    "https://www.myinstants.com/media/sounds/joyca-noel.mp3",
    "https://www.myinstants.com/media/sounds/bien-soigne.mp3",
    "https://www.myinstants.com/media/sounds/ah-si-tu-pouvais-fermer-ta-gueule.mp3",
    "https://www.myinstants.com/media/sounds/chinese-guy-rap.mp3",
    "https://www.myinstants.com/media/sounds/oui-je-suis-raciste.mp3",
    "https://www.myinstants.com/media/sounds/scream-meme.mp3",
    "https://www.myinstants.com/media/sounds/excuse-moi-taurais-pas-un-zob-dans-lcul.mp3",
    "https://www.myinstants.com/media/sounds/among-us-role-reveal-sound.mp3",
    "https://www.myinstants.com/media/sounds/english-or-spanish-song.mp3",
    "https://www.myinstants.com/media/sounds/gay-echo.mp3",
    "https://www.myinstants.com/media/sounds/aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.mp3",
    "https://www.myinstants.com/media/sounds/non-cest-pas-une-matraque.mp3",
    "https://www.myinstants.com/media/sounds/yeah-boiii-i-i-i.mp3",
    "https://www.myinstants.com/media/sounds/whatsapp-bass-boosted.mp3",
    "https://www.myinstants.com/media/sounds/swan-meme-without-aaaaaaa.mp3"
];

// Fonction pour générer un lien unique avec un timestamp
function generateGameLink() {
    const gameData = {
        sounds: soundsQueue, 
        startTime: Date.now(),  // On enregistre l'heure de début
    };
    const gameDataString = JSON.stringify(gameData);
    const gameLinkUrl = window.location.origin + window.location.pathname + "?data=" + encodeURIComponent(gameDataString);
    gameLink.value = gameLinkUrl; 
    linkSection.style.display = "block"; 
}

// Fonction pour démarrer le jeu
function startGame() {
    gameStarted = true;
    message.textContent = "Try not to laugh! Sounds will start soon...";

    // Créer un ordre aléatoire de sons
    soundsQueue = [...sounds];
    soundsQueue = soundsQueue.sort(() => Math.random() - 0.5); 

    generateGameLink();

    // Calculer l'heure de début et le temps relatif des autres joueurs
    setInterval(() => {
        const randomDelay = Math.floor(Math.random() * (120000 - 10000) + 10000);
        setTimeout(playRandomSound, randomDelay);
    }, 2000); 
}

// Fonction pour jouer un son en synchronisation
function playRandomSound() {
    const randomSound = soundsQueue.pop(); 
    if (!randomSound) return; 

    const audio = new Audio(randomSound);
    audio.play();
}

// Fonction pour récupérer les données de jeu via l'URL
function loadGameData() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameDataString = decodeURIComponent(urlParams.get("data"));
    if (gameDataString) {
        const gameData = JSON.parse(gameDataString);
        soundsQueue = gameData.sounds || [];
        startSynchronisation(gameData.startTime); 
    }
}

// Fonction pour démarrer la synchronisation avec l'heure des autres joueurs
function startSynchronisation(startTime) {
    const now = Date.now();
    const delay = startTime - now;  // Calcul du délai par rapport à l'heure du serveur

    // Attendre le délai pour démarrer la partie
    setTimeout(() => {
        message.textContent = "Game is starting!";
        soundsQueue.forEach((sound, index) => {
            const audio = new Audio(sound);
            setTimeout(() => {
                audio.play();  // Jouer les sons en fonction de l'ordre
            }, index * 5000);  // Espacement de 5 secondes entre chaque son
        });
    }, delay);
}

// Copier le lien
copyButton.addEventListener("click", () => {
    gameLink.select();
    document.execCommand("copy");
    alert("Link copied to clipboard!");
});

// Démarrer le jeu
startButton.addEventListener("click", () => {
    if (!gameStarted) {
        startGame();
    }
});

// Charger les données de jeu si un lien est ouvert
loadGameData();

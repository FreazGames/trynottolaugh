const startButton = document.getElementById("start-btn");
const message = document.getElementById("message");
const linkSection = document.getElementById("link-section");
const gameLink = document.getElementById("game-link");
const copyButton = document.getElementById("copy-btn");

let gameInterval = null;
let gameStarted = false;
let currentlyPlaying = false; 
let soundsQueue = []; // Ordre des sons à jouer

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

// Fonction pour générer un lien unique
function generateGameLink() {
    const gameData = {
        sounds: soundsQueue, // Le tableau des sons à jouer dans l'ordre
        timestamp: Date.now(), // Marque temporelle pour assurer l'unicité
    };
    const gameDataString = JSON.stringify(gameData);
    const gameLinkUrl = window.location.origin + window.location.pathname + "?data=" + encodeURIComponent(gameDataString);
    gameLink.value = gameLinkUrl; // Afficher le lien dans le champ
    linkSection.style.display = "block"; // Afficher la section du lien
}

// Fonction pour démarrer le jeu
function startGame() {
    gameStarted = true;
    message.textContent = "Essayez de ne pas rire ! Les sons commencent...";

    // Créer un ordre aléatoire de sons
    soundsQueue = [...sounds];
    soundsQueue = soundsQueue.sort(() => Math.random() - 0.5); // Mélanger l'ordre des sons

    // Générer et afficher le lien
    generateGameLink();

    // Commencer à jouer les sons avec des intervalles aléatoires
    gameInterval = setInterval(() => {
        const randomDelay = Math.floor(Math.random() * (120000 - 10000) + 10000); // Entre 10s et 2min
        setTimeout(playRandomSound, randomDelay);
    }, 2000); // Vérifie toutes les 2 secondes si un son peut être joué
}

// Fonction pour jouer un son aléatoire
function playRandomSound() {
    if (currentlyPlaying) return;

    const randomSound = soundsQueue.pop(); // Récupérer le dernier son dans la liste
    if (!randomSound) return; // Si plus de sons, on arrête

    currentlyPlaying = true;
    const audio = new Audio(randomSound);
    audio.play();

    // Quand le son se termine, permettre un nouveau son
    audio.onended = () => {
        currentlyPlaying = false;
    };
}

// Fonction pour récupérer les données de jeu via l'URL
function loadGameData() {
    const urlParams = new URLSearchParams(window.location.search);
    const gameDataString = decodeURIComponent(urlParams.get('data'));
    if (gameDataString) {
        const gameData = JSON.parse(gameDataString);
        soundsQueue = gameData.sounds;
        message.textContent = "Jeu synchronisé. Préparez-vous !";
    }
}

// Copier le lien
copyButton.addEventListener("click", () => {
    gameLink.select();
    document.execCommand("copy");
});

// Démarrer le jeu
startButton.addEventListener("click", () => {
    if (!gameStarted) {
        startButton.textContent = "Arrêter";
        startGame();
    } else {
        startButton.textContent = "Commencer";
        clearInterval(gameInterval);
        message.textContent = "Jeu arrêté. Cliquez sur 'Commencer' pour rejouer.";
    }
});

// Charger les données de jeu si le lien est partagé
window.onload = loadGameData;

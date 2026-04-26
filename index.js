document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const mainBtn = document.getElementById('mainPlayBtn');
    const chatBox = document.getElementById('chatBox');

    // --- LOGIQUE DES JEUX ---
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const url = card.getAttribute('data-url');
            const name = card.getAttribute('data-game');
            
            // Effet de secousse sur la carte
            card.classList.add('shake');
            setTimeout(() => card.classList.remove('shake'), 500);

            console.log(`Lancement de ${name}...`);
            window.open(url, '_blank');
        });
    });

    // Bouton Aléatoire Fun
    mainBtn.onclick = () => {
        const randomIndex = Math.floor(Math.random() * cards.length);
        const randomGame = cards[randomIndex];
        mainBtn.innerText = "DESTINATION : " + randomGame.getAttribute('data-game').toUpperCase();
        setTimeout(() => randomGame.click(), 1000);
    };



    // --- MUSIQUE ---
  document.addEventListener('DOMContentLoaded', () => {
    const musicBtn = document.getElementById('musicBtn');
    const musicIcon = musicBtn.querySelector('i');
    const trackText = document.getElementById('trackName');
    const audio = document.getElementById('bgMusic');
    
    let isPlaying = false;

    // Fonction pour basculer la musique
    musicBtn.addEventListener('click', () => {
        if (!isPlaying) {
            // Lancer la musique
            audio.play().then(() => {
                isPlaying = true;
                musicIcon.classList.add('fa-spin'); // Le disque tourne
                trackText.innerText = "Mix : Gaming Pulse (ON)";
                musicBtn.style.color = "#00f2ff"; // Couleur Néon
                musicBtn.style.opacity = "1";
            }).catch(error => {
                console.log("Erreur de lecture : ", error);
                alert("Cliquez à nouveau pour autoriser la musique !");
            });
        } else {
            // Mettre en pause
            audio.pause();
            isPlaying = false;
            musicIcon.classList.remove('fa-spin'); // Le disque s'arrête
            trackText.innerText = "Musique : PAUSE";
            musicBtn.style.color = "#888";
            musicBtn.style.opacity = "0.5";
        }
    });
});
});

// Remplace 'TA_CLE_API_ICI' par ta vraie clé récupérée sur Ably.com
const ably = new Ably.Realtime('TA_CLE_API_ICI');
const channel = ably.channels.get('global-chat');

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');

    // 1. ÉCOUTER LES MESSAGES (REÇOIT LES MESSAGES DES AUTRES)
    channel.subscribe('message', (msg) => {
        const isMe = msg.data.userId === ably.connection.id;
        displayMessage(msg.data.user, msg.data.text, isMe);
    });

    // 2. ENVOYER UN MESSAGE (DIFFUSE À TOUT LE MONDE)
    function sendMessage() {
        const text = userInput.value.trim();
        if (text !== "") {
            channel.publish('message', {
                user: "Player_" + ably.connection.id.substring(0, 4), // Nom généré
                text: text,
                userId: ably.connection.id
            });
            userInput.value = "";
        }
    }

    // Affichage dans le HTML
    function displayMessage(user, text, isMe) {
        const msgDiv = document.createElement('div');
        msgDiv.className = isMe ? "msg me" : "msg online";
        
        // Nettoyage du texte pour la sécurité
        const safeText = text.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        msgDiv.innerHTML = `<span>${user}:</span> ${safeText}`;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendBtn.onclick = sendMessage;
    userInput.onkeypress = (e) => { if (e.key === 'Enter') sendMessage(); };
});

document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('pokiSearch');

    // Écouteur pour la touche Entrée
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const query = searchInput.value.trim();
            
            if (query !== "") {
                // Encode le texte pour l'URL (ex: "super car" devient "super%20car")
                const searchQuery = encodeURIComponent(query);
                
                // URL de recherche officielle de Poki
                const pokiUrl = `https://poki.com/fr/search?q=${searchQuery}`;
                
                // Effet visuel drôle avant de partir
                searchInput.style.borderColor = "#00f2ff";
                searchInput.value = "Lancement...";

                setTimeout(() => {
                    window.open(pokiUrl, '_blank');
                    searchInput.value = ""; // Réinitialise la barre
                }, 500);
            }
        }
    });
});
console.log("Javascript file loaded!");

// Song collection data
let songCollection = [
    {title: "Bohemian Rhapsody", artist: "Queen", rarity: "legendary", owned: true},
    {title: "Billie Jean", artist: "Michael Jackson", rarity: "epic", owned: true},
    {title: "Wonderwall", artist: "Oasis", rarity: "rare", owned: true},
    {title: "Yesterday", artist: "The Beatles", rarity: "common", owned: true},
    {title: "Stairway to Heaven", artist: "Led Zeppelin", rarity: "legendary", owned: false},
    {title: "Thriller", artist: "Michael Jackson", rarity: "epic", owned: false},
    {title: "Don't Stop Believin'", artist: "Journey", rarity: "rare", owned: false},
    {title: "Hey Jude", artist: "The Beatles", rarity: "common", owned: false},
    {title: "Sweet Child O' Mine", artist: "Guns N' Roses", rarity: "rare", owned: false},
    {title: "Imagine", artist: "John Lennon", rarity: "common", owned: false}
];

let playsRemaining = 3;

// Wheel spinning variables
let isSpinning = false;
let currentRotation = 0;

function displaySongsInCollection() {
    let container = document.getElementById('collection-scroll');
    container.innerText = '';
    
    // Create "Your Songs" section header
    let ownedHeader = document.createElement('div');
    ownedHeader.style.padding = '1rem 0';
    ownedHeader.style.borderBottom = '2px solid #06ffa5';
    ownedHeader.style.marginBottom = '1rem';
    ownedHeader.style.color = '#06ffa5';
    ownedHeader.style.fontWeight = 'bold';
    ownedHeader.style.fontSize = '1.3rem';
    ownedHeader.innerText = '✅ Your Songs';
    container.appendChild(ownedHeader);
    
    // Sort owned songs by rarity (legendary first)
    let rarityOrder = {legendary: 1, epic: 2, rare: 3, common: 4};
    let ownedSongs = [];
    let unownedSongs = [];
    
    // Separate owned and unowned
    for (let i = 0; i < songCollection.length; i++) {
        if (songCollection[i].owned) {
            ownedSongs.push(songCollection[i]);
        } else {
            unownedSongs.push(songCollection[i]);
        }
    }
    
    // Sort both arrays by rarity
    ownedSongs.sort(function(a, b) {
        return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    });
    
    unownedSongs.sort(function(a, b) {
        return rarityOrder[a.rarity] - rarityOrder[b.rarity];
    });
    
    // Add owned songs
    for (let i = 0; i < ownedSongs.length; i++) {
        let song = ownedSongs[i];
        let card = document.createElement('div');
        card.className = `song-card ${song.rarity} owned`;
        card.style.marginBottom = '0.8rem';
        card.innerHTML = `<div class="song-info"><h4>${song.title}</h4><p>${song.artist}</p><span class="rarity-badge">${song.rarity.toUpperCase()}</span></div>`;
        container.appendChild(card);
    }
    
    // Create "Locked Songs" section header
    let lockedHeader = document.createElement('div');
    lockedHeader.style.padding = '1rem 0';
    lockedHeader.style.borderBottom = '2px solid #ff006e';
    lockedHeader.style.marginBottom = '1rem';
    lockedHeader.style.marginTop = '2rem';
    lockedHeader.style.color = '#ff006e';
    lockedHeader.style.fontWeight = 'bold';
    lockedHeader.style.fontSize = '1.3rem';
    lockedHeader.innerText = '🔒 Locked Songs';
    container.appendChild(lockedHeader);
    
    // Add unowned songs
    for (let i = 0; i < unownedSongs.length; i++) {
        let song = unownedSongs[i];
        let card = document.createElement('div');
        card.className = `song-card ${song.rarity} unowned`;
        card.style.marginBottom = '0.8rem';
        card.innerHTML = `<div class="song-info"><h4>${song.title}</h4><p>${song.artist}</p><span class="rarity-badge">${song.rarity.toUpperCase()}</span></div>`;
        container.appendChild(card);
    }
}

function updatePlaysDisplay() {
    let playsCounter = document.querySelector('.plays-counter');
    playsCounter.innerText = `Plays Remaining: ${playsRemaining}`;
}

function spinWheel() {
    if (playsRemaining <= 0) {
        alert("No plays remaining! Watch an ad or wait for more plays.");
        return;
    }
    
    if (isSpinning) {
        return;
    }
    
    isSpinning = true;
    let spinButton = document.getElementById('spin-button');
    let wheel = document.querySelector('.wheel');
    
    playsRemaining = playsRemaining - 1;
    updatePlaysDisplay();
    
    spinButton.innerText = "SPINNING...";
    
    // Get target rarity and log it to console
    let targetRarity = getRandomRarity();
    console.log("Target rarity:", targetRarity);
    
    // Use if/else to set degrees based on target rarity
    let targetDegrees;
    if (targetRarity === "legendary") {
        targetDegrees = 22.5; // Middle of 0-45 range
        console.log("Going to legendary at 22.5 degrees");
    } else if (targetRarity === "epic") {
        targetDegrees = 67.5; // Middle of 45-90 range
        console.log("Going to epic at 67.5 degrees");
    } else if (targetRarity === "rare") {
        targetDegrees = 112.5; // Middle of 90-135 range
        console.log("Going to rare at 112.5 degrees");
    } else if (targetRarity === "common") {
        targetDegrees = 157.5; // Middle of 135-180 range
        console.log("Going to common at 157.5 degrees");
    }
    
    // Apply transform to spin wheel
    wheel.style.transform = `rotate(${targetDegrees}deg)`;
    
    setTimeout(function() {
        console.log("Spin complete - should have landed on:", targetRarity);
        spinButton.innerText = "SPIN NOW";
        isSpinning = false;
    }, 3000);
}

function getRandomRarity() {
    let random = Math.random() * 100;
    
    if (random <= 5) {
        return "legendary";
    } else if (random <= 20) {
        return "epic"; 
    } else if (random <= 50) {
        return "rare";
    } else {
        return "common";
    }
}

function showSpinResult(rarity) {
    console.log("Spin result:", rarity);
}

// Setup everything when page loads
console.log("Setting up sidebar...");

let button = document.getElementById('collection-toggle');
let sidebar = document.getElementById('collection-sidebar');
let overlay = document.getElementById('sidebar-overlay');
let closeButton = document.getElementById('close-sidebar');

button.onclick = function() {
    console.log("BUTTON CLICKED! Opening sidebar...");
    sidebar.classList.add('open');
    overlay.classList.add('active');
    console.log("Added 'open' class to sidebar");
    console.log("Added 'active' class to overlay");
};

closeButton.onclick = function() {
    console.log("CLOSE BUTTON CLICKED! Closing sidebar...");
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    console.log("Removed 'open' class from sidebar");
    console.log("Removed 'active' class from overlay");
};

overlay.onclick = function() {
    console.log("OVERLAY CLICKED! Closing sidebar...");
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
};

let spinButton = document.getElementById('spin-button');
spinButton.onclick = function() {
    console.log("Spin button clicked!");
    spinWheel();
};

displaySongsInCollection();
updatePlaysDisplay();

console.log("Ready to test!");
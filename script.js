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
    
    let randomSpin = Math.random() * 360 + 1440;
    currentRotation += randomSpin;
    
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    
    setTimeout(function() {
        let finalAngle = currentRotation % 360;
        let result = getRarityFromAngle(finalAngle);
        showSpinResult(result);
        
        if (playsRemaining <= 0) {
            spinButton.innerText = "NO PLAYS LEFT";
            spinButton.style.background = "gray";
        } else {
            spinButton.innerText = "SPIN NOW";
        }
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

function getRarityFromAngle(angle) {
    // Your wheel has 8 segments, each taking up 45 degrees
    let adjustedAngle = (360 - angle + 90) % 360;
    
    if (adjustedAngle >= 0 && adjustedAngle < 45) {
        return "legendary";
    } else if (adjustedAngle >= 45 && adjustedAngle < 90) {
        return "epic";
    } else if (adjustedAngle >= 90 && adjustedAngle < 135) {
        return "epic";  // This was showing as "rare" but should be "epic"
    } else if (adjustedAngle >= 135 && adjustedAngle < 180) {
        return "epic";  // This was showing as "common" but should be "epic"
    } else if (adjustedAngle >= 180 && adjustedAngle < 225) {
        return "rare";
    } else if (adjustedAngle >= 225 && adjustedAngle < 270) {
        return "common";
    } else if (adjustedAngle >= 270 && adjustedAngle < 315) {
        return "legendary";  // This was showing as "epic" but should be "legendary"
    } else {
        return "common";

        console.log("Calculated result:", result);
        return result;
    }
}

function showSpinResult(rarity) {
    alert(`You won a ${rarity.toUpperCase()} song!`);
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
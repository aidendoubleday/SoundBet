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
let musicNotes = 3000;

// Statistics tracking
let totalSpins = 0;
let wheelWins = 0;
let rouletteWins = 0;
let rouletteLosses = 0;
let slotsWins = 0;
let slotsLosses = 0;
let totalNotesEarned = 0;

// Load statistics from localStorage
let savedStats = localStorage.getItem('playerStats');
if (savedStats !== null) {
    let stats = JSON.parse(savedStats);
    totalSpins = stats.totalSpins;
    wheelWins = stats.wheelWins;
    rouletteWins = stats.rouletteWins;
    rouletteLosses = stats.rouletteLosses;
    slotsWins = stats.slotsWins;
    slotsLosses = stats.slotsLosses;
    totalNotesEarned = stats.totalNotesEarned;
    console.log("Loaded player stats!");
}

function saveStatistics() {
    let stats = {
        totalSpins: totalSpins,
        wheelWins: wheelWins,
        rouletteWins: rouletteWins,
        rouletteLosses: rouletteLosses,
        slotsWins: slotsWins,
        slotsLosses: slotsLosses,
        totalNotesEarned: totalNotesEarned
    };
    localStorage.setItem('playerStats', JSON.stringify(stats));
}

let savedSongs = localStorage.getItem('songCollection');
if (savedSongs !== null) {
    songCollection = JSON.parse(savedSongs);
    console.log("Loaded saved songs!");
}

let savedPlays = localStorage.getItem('playsRemaining');
if (savedPlays !== null) {
    playsRemaining = Number(savedPlays);
    console.log("Loaded saved plays:", playsRemaining);
}

let savedNotes = localStorage.getItem('musicNotes');
if (savedNotes !== null) {
    musicNotes = Number(savedNotes);
    console.log("Loaded saved music notes:", musicNotes);
}

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

function updateMusicNotesDisplay() {
    let notesDisplay = document.querySelector('.music-notes');
    notesDisplay.innerText = `♪ ${musicNotes}`;
}

function spinWheel() {
    let spinCost = 100;

    if (playsRemaining <= 0 || isSpinning) {
        return;
    }

    if (musicNotes < spinCost) {
        alert("Not enough Music Notes! You need ♪ " + spinCost + " to spin.");
        return;
    }
    
    isSpinning = true;
    playsRemaining = playsRemaining - 1;
    musicNotes = musicNotes - spinCost;
    totalSpins = totalSpins + 1;
    localStorage.setItem('playsRemaining', playsRemaining);
    localStorage.setItem('musicNotes', musicNotes);
    localStorage.setItem('songCollection', JSON.stringify(songCollection));
    console.log("Saved! Plays:", playsRemaining, "Notes:", musicNotes);
    updatePlaysDisplay();
    updateMusicNotesDisplay();
    
    let spinButton = document.getElementById('spin-button');
    let wheel = document.querySelector('.wheel');
    
    spinButton.innerText = "SPINNING...";
    
    let targetRarity = getRandomRarity();
    console.log("Target:", targetRarity);
    
    let targetAngle;
        if (targetRarity === "legendary") {
    targetAngle = 45;  // Changed from 315
        } else if (targetRarity === "epic") {
    targetAngle = 315;  // Changed from 45
        } else if (targetRarity === "rare") {
    targetAngle = 135;
        } else {
    targetAngle = 225;
    }
    
    // Calculate where we currently are
    let currentAngle = currentRotation % 360;
    if (currentAngle < 0) currentAngle += 360;
    
    // Calculate shortest distance to target
    let difference = targetAngle - currentAngle;
    
    // Add 1440 (4 spins) plus the difference
    currentRotation = currentRotation + 1440 + difference;
    
    console.log("Spinning to total rotation:", currentRotation);
    
    wheel.style.transform = `rotate(${currentRotation}deg)`;
    
    setTimeout(function() {
    spinButton.innerText = "SPIN NOW";
    isSpinning = false;
    
    // Unlock a song of the winning rarity
    let unlockedSong = unlockRandomSong(targetRarity);
    
    if (unlockedSong !== null) {
        wheelWins = wheelWins + 1;
        saveStatistics();
        alert("🎉 You won: " + unlockedSong.title + " by " + unlockedSong.artist + "!");
    } else {
        alert("You already own all " + targetRarity + " songs! Here's ♪ 50 instead.");
        musicNotes = musicNotes + 50;
        updateMusicNotesDisplay();
        localStorage.setItem('musicNotes', musicNotes);
    }
    
    // Refresh the collection display
    displaySongsInCollection();
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

function watchAd() {
    let adButton = document.getElementById('watch-ad-button');
    
    // Disable button and show "ad playing"
    adButton.innerText = "📺 Playing Ad...";
    adButton.disabled = true;
    
    // Wait 8 seconds (pretend ad is playing)
    setTimeout(function() {
        // Add 1 spin
        playsRemaining = playsRemaining + 1;
        
        // Add 50 Music Notes
        musicNotes = musicNotes + 50;
        
        // Update displays
        updatePlaysDisplay();
        updateMusicNotesDisplay();
        
        // Save to localStorage
        localStorage.setItem('playsRemaining', playsRemaining);
        localStorage.setItem('musicNotes', musicNotes);
        
        // Show alert (ADD THIS HERE!)
        alert("Ad finished! 50 Music Notes and 1 Spin awarded!");
        
        // Re-enable button
        adButton.innerText = "📺 Watch Ad for Extra Spin and 50 Music Notes";
        adButton.disabled = false;
        
        console.log("Ad watched! Added 1 spin and 50 notes. Total notes:", musicNotes);
    }, 8000);
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

let adButton = document.getElementById('watch-ad-button');
adButton.onclick = function() {
    console.log("Watch ad button clicked!");
    watchAd();
};

// Roulette game functions
function playRoulette(chosenGenre) {
    let betInput = document.getElementById('bet-amount');
    let betAmount = Number(betInput.value);
    let resultDisplay = document.getElementById('roulette-result');
    
    if (musicNotes < betAmount) {
        resultDisplay.innerText = "Not enough Music Notes!";
        resultDisplay.style.color = "#ff006e";
        return;
    }
    
    if (betAmount < 50) {
        resultDisplay.innerText = "Minimum bet is ♪ 50!";
        resultDisplay.style.color = "#ff006e";
        return;
    }
    
    musicNotes = musicNotes - betAmount;
    updateMusicNotesDisplay();
    
    resultDisplay.innerText = "🎲 Spinning...";
    resultDisplay.style.color = "#ffbe0b";
    
    let genres = ["rock", "pop", "hiphop", "jazz"];
    let randomIndex = Math.floor(Math.random() * genres.length);
    let winningGenre = genres[randomIndex];
    
    setTimeout(function() {
        if (chosenGenre === winningGenre) {
            let winnings = betAmount * 3;
            musicNotes = musicNotes + winnings;
            rouletteWins = rouletteWins + 1;
            totalNotesEarned = totalNotesEarned + (betAmount * 2);
            saveStatistics();
            resultDisplay.innerText = "🎉 YOU WON ♪ " + winnings + "!";
            resultDisplay.style.color = "#06ffa5";
        } else {
            rouletteLosses = rouletteLosses + 1;
            saveStatistics();
            resultDisplay.innerText = "❌ Lost! Winner was " + winningGenre.toUpperCase();
            resultDisplay.style.color = "#ff006e";
        }
        
        updateMusicNotesDisplay();
        localStorage.setItem('musicNotes', musicNotes);
    }, 2000);
}

// Open and close roulette
let openRouletteButton = document.getElementById('open-roulette');
let closeRouletteButton = document.getElementById('close-roulette');
let rouletteFullscreen = document.getElementById('roulette-fullscreen');
let rouletteOverlay = document.getElementById('roulette-overlay');

openRouletteButton.onclick = function() {
    rouletteFullscreen.classList.add('open');
    rouletteOverlay.classList.add('active');
};

closeRouletteButton.onclick = function() {
    rouletteFullscreen.classList.remove('open');
    rouletteOverlay.classList.remove('active');
};

rouletteOverlay.onclick = function() {
    rouletteFullscreen.classList.remove('open');
    rouletteOverlay.classList.remove('active');
};

// Genre button clicks
let rockButton = document.getElementById('genre-rock');
rockButton.onclick = function() {
    playRoulette('rock');
};

let popButton = document.getElementById('genre-pop');
popButton.onclick = function() {
    playRoulette('pop');
};

let hiphopButton = document.getElementById('genre-hiphop');
hiphopButton.onclick = function() {
    playRoulette('hiphop');
};

let jazzButton = document.getElementById('genre-jazz');
jazzButton.onclick = function() {
    playRoulette('jazz');
};

function unlockRandomSong(rarity) {
    // Find all unowned songs of this rarity
    let availableSongs = [];
    for (let i = 0; i < songCollection.length; i++) {
        if (songCollection[i].rarity === rarity && songCollection[i].owned === false) {
            availableSongs.push(i);
        }
    }
    
    // If no songs available of this rarity, return null
    if (availableSongs.length === 0) {
        return null;
    }
    
    // Pick a random song from available ones
    let randomIndex = Math.floor(Math.random() * availableSongs.length);
    let songIndex = availableSongs[randomIndex];
    
    // Mark it as owned
    songCollection[songIndex].owned = true;
    
    // Save to localStorage
    localStorage.setItem('songCollection', JSON.stringify(songCollection));
    
    // Return the song info
    return songCollection[songIndex];
}

// Slots game variables
let isSlotsSpinning = false;
let slotSymbols = ["🎵", "🎸", "🎤", "🎧", "🎷"];

function getRandomSymbol() {
    let randomIndex = Math.floor(Math.random() * slotSymbols.length);
    return slotSymbols[randomIndex];
}

function animateSlot(slotId, finalSymbol, duration) {
    let slot = document.getElementById(slotId);
    let startTime = Date.now();
    let interval = 100;
    
    let animation = setInterval(function() {
        slot.innerText = getRandomSymbol();
        
        if (Date.now() - startTime >= duration) {
            clearInterval(animation);
            slot.innerText = finalSymbol;
        }
    }, interval);
}

function playSlots() {
    let spinCost = 50;
    let resultDisplay = document.getElementById('slots-result');
    let spinButton = document.getElementById('slots-spin-button');
    
    if (isSlotsSpinning) {
        return;
    }
    
    if (musicNotes < spinCost) {
        resultDisplay.innerText = "Not enough Music Notes!";
        resultDisplay.style.color = "#ff006e";
        return;
    }
    
    isSlotsSpinning = true;
    musicNotes = musicNotes - spinCost;
    updateMusicNotesDisplay();
    localStorage.setItem('musicNotes', musicNotes);
    
    spinButton.disabled = true;
    spinButton.innerText = "SPINNING...";
    resultDisplay.innerText = "";
    
    // Pick final symbols
    let symbol1 = getRandomSymbol();
    let symbol2 = getRandomSymbol();
    let symbol3 = getRandomSymbol();
    
    // Animate each slot (different durations for effect)
    animateSlot('slot1', symbol1, 1000);
    animateSlot('slot2', symbol2, 1500);
    animateSlot('slot3', symbol3, 2000);
    
    // Check result after all animations finish
    setTimeout(function() {
        if (symbol1 === symbol2 && symbol2 === symbol3) {
            // WIN!
            let randomRarity = getRandomRarity();
            let unlockedSong = unlockRandomSong(randomRarity);
            
            if (unlockedSong !== null) {
                resultDisplay.innerText = "🎉 JACKPOT! Won: " + unlockedSong.title + "!";
                resultDisplay.style.color = "#06ffa5";
                displaySongsInCollection();
            } else {
                let bonus = 200;
                musicNotes = musicNotes + bonus;
                updateMusicNotesDisplay();
                localStorage.setItem('musicNotes', musicNotes);
                resultDisplay.innerText = "🎉 JACKPOT! Won ♪ " + bonus + "!";
                resultDisplay.style.color = "#06ffa5";
            }
        } else {
            // LOSE
            resultDisplay.innerText = "❌ No match! Try again!";
            resultDisplay.style.color = "#ff006e";
        }
        
        isSlotsSpinning = false;
        spinButton.disabled = false;
        spinButton.innerText = "SPIN SLOTS";
    }, 2500);
}

// Open and close slots
let openSlotsButton = document.getElementById('open-slots');
let closeSlotsButton = document.getElementById('close-slots');
let slotsFullscreen = document.getElementById('slots-fullscreen');
let slotsOverlay = document.getElementById('slots-overlay');

openSlotsButton.onclick = function() {
    slotsFullscreen.classList.add('open');
    slotsOverlay.classList.add('active');
};

closeSlotsButton.onclick = function() {
    slotsFullscreen.classList.remove('open');
    slotsOverlay.classList.remove('active');
};

slotsOverlay.onclick = function() {
    slotsFullscreen.classList.remove('open');
    slotsOverlay.classList.remove('active');
};

// Slots spin button
let slotsSpin = document.getElementById('slots-spin-button');
slotsSpin.onclick = function() {
    playSlots();
};

displaySongsInCollection();
updatePlaysDisplay();
updateMusicNotesDisplay();

console.log("Ready to test!");
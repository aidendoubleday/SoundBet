console.log("Javascript file loaded!")

document.addEventListener('DOMContentLoaded', function() {
    console.log("Setting up sidebar...");
    
    let button = document.getElementById('collection-toggle');
    let sidebar = document.getElementById('collection-sidebar');
    let overlay = document.getElementById('sidebar-overlay');
    
    button.onclick = () => {
        console.log("BUTTON CLICKED! Opening sidebar...");
        sidebar.classList.add('open');
        overlay.classList.add('active');
        console.log("Added 'open' class to sidebar");
        console.log("Added 'active' class to overlay");
    };
    
    console.log("Ready to test!");
});



// ========================================================
// 1. INITIALIZE SIGNATURE & INTERACTIONS IMMEDIATELY
// ========================================================

document.addEventListener("DOMContentLoaded", () => {
    const gifImage = document.getElementById('signature-gif');
    
    if (gifImage) {
        // Appends single query timestamp token to force zero-index loop frame cleanly
        gifImage.src = "signature2.gif?t=" + new Date().getTime();
    }

    // The delay function has been completely removed. 
    // Scroll triggers and hovers activate instantly on load.
    setupInteractions();
});


// ========================================================
// 2. VIEWPORT SNAPPING & SAFE CONDITION LOGIC
// ========================================================

function setupInteractions() {
    const panelsDrawer = document.getElementById('panels-drawer');

    if (!panelsDrawer) {
        console.warn("Warning: Element with id 'panels-drawer' was not found in the HTML.");
        return;
    }

    // Safely track when the panels have successfully snapped into full view
    const observerOptions = {
        root: null,
        threshold: 0.95 // Activates when 95% of the panels are filling the screen
    };

    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            // Panels are up: Allow the house/lake image hover reveals
            document.body.classList.add('panels-in-view');
        } else {
            // Panels are down: Keep image reveals locked, allow the slight 20px lift hover
            document.body.classList.remove('panels-in-view');
        }
    }, observerOptions);

    observer.observe(panelsDrawer);

    // Smooth Click-to-Pull-Up Handling
    const panels = document.querySelectorAll('.scroll-panel');
    panels.forEach(panel => {
        panel.addEventListener('click', (e) => {
            // If they are just peeking, let native smooth scroll pull them up
            if (!document.body.classList.contains('panels-in-view')) {
                e.preventDefault();
                panelsDrawer.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } 
            // If they are already fully up, process the link redirect
            else {
                const redirectTarget = panel.getAttribute('data-target');
                if (redirectTarget) {
                    window.location.href = redirectTarget;
                }
            }
        });
    });
}
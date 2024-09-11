// Function to handle routing based on hash value
function handleHashChange() {
    const hash = location.hash.substring(1) || "home"; // Default to "home" if no hash
    const sections = document.querySelectorAll('section');
    const links = document.querySelectorAll('.nav-link');

    // Show the active section and hide others
    sections.forEach(section => {
        section.classList.toggle('active', section.id === hash);
    });

    // Highlight the active link
    links.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${hash}`);
    });
}

// Initial call to handle the default hash
handleHashChange();

// Listen for hash changes in the URL
window.addEventListener('hashchange', handleHashChange);

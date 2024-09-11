// Select elements
const mainContent = document.getElementById('game-select');
const newContent = document.getElementById('mode-select');
const twoDPongButton = document.getElementById('2d-pong');
const backButton = document.getElementById('back-button');
const languageButton = document.getElementById('globe-icon');


// Function to show the 2D Pong content
function show2DPongModeSelCont() {
	// Hide the main content
	mainContent.style.display = 'none';
	// Show the new content
	newContent.style.display = 'block';
	// Update the URL hash
	window.location.hash = '#2d-pong';
}

// Function to go back to the main content
function showGameSelCont() {
	newContent.style.display = 'none';
	mainContent.style.display = 'block';
	window.location.hash = '#home';
}

// Event listener for the 2D Pong button
twoDPongButton.addEventListener('click', show2DPongModeSelCont);

// Event listener for the back button
backButton.addEventListener('click', showGameSelCont);

// Check the current hash when the page loads or when the hash changes
function handleHashChange() {
	if (window.location.hash === '#2d-pong')
		show2DPongModeSelCont();
	else if (window.location.hash === '#home')
		showGameSelCont();
}

// Check the hash on page load
window.addEventListener('load', handleHashChange);

// Listen for changes in the hash (when the user clicks the back/forward browser buttons)
window.addEventListener('hashchange', handleHashChange);

function langSelect() {
	let languageOptions = document.getElementById('language-options');
	if (languageOptions.style.display === 'none')
		languageOptions.style.display = 'block';
	else
		languageOptions.style.display = 'none';
}

languageButton.addEventListener('click', langSelect)

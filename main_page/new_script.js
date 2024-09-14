const mainContent = document.getElementById('game-select');
const twoDModeSel = document.getElementById('2d-mode-select');
const threeDModeSel = document.getElementById('3d-mode-select');
const twoDPongButton = document.getElementById('2d-pong-btn');
const threeDPongButton = document.getElementById('3d-pong-btn');
const twoDBackButton = document.getElementById('2d-back-button');
const threeDBackButton = document.getElementById('3d-back-button');
const languageButton = document.getElementById('globe-icon');

const translations = {
	en: {
		welcome: "WELCOME TO PONG!",
		twoDPong: "2D Pong",
		threeDPong: "3D Pong",
		gameModeSel: "SELECT YOUR GAME MODE",
		oneVone: "1V1",
		tournament: "Tournament",
	},
	ko: {
		welcome: "PONG에 오신 것을 환영합니다!",
		twoDPong: "평면 Pong",
		threeDPong: "입체 Pong",
		gameModeSel: "원하시는 게임 방식을 선택하세요",
		oneVone: "일대일",
		tournament: "토너먼트",
	},
	ja: {
		welcome: "PONGへようこそ!",
		twoDPong: "平面 Pong",
		threeDPong: "立体 Pong",
		gameModeSel: "ゲームモードを選択",
		oneVone: "一対一",
		tournament: "トーナメント",
	}
};

// Function to show the 2D Pong content
function show2DPongModeSelCont() {
	mainContent.style.display = 'none';
	threeDModeSel.style.display = 'none';
	twoDModeSel.style.display = 'block';

	// Update the URL hash
	const currentLang = getCurrentLanguageFromHash();
	window.location.hash = `#${currentLang}/2d-pong`;
}

function show3DPongModeSelCont() {
	mainContent.style.display = 'none';
	twoDModeSel.style.display = 'none';
	threeDModeSel.style.display = 'block';

	const currentLang = getCurrentLanguageFromHash();
	window.location.hash = `#${currentLang}/3d-pong`;
}

// Function to go back to the main content
function showGameSelCont() {
	twoDModeSel.style.display = 'none';
	threeDModeSel.style.display = 'none';
	mainContent.style.display = 'block';
	const currentLang = getCurrentLanguageFromHash();
	window.location.hash = `#${currentLang}/home`;
}

// Event listener for the 2D Pong button
twoDPongButton.addEventListener('click', show2DPongModeSelCont);

threeDPongButton.addEventListener('click', show3DPongModeSelCont);

// Event listener for the back button
twoDBackButton.addEventListener('click', showGameSelCont);
threeDBackButton.addEventListener('click', showGameSelCont);

// Function to get the current language from the hash
function getCurrentLanguageFromHash() {
	const hash = window.location.hash.substring(1);
	const [lang] = hash.split('/');
	return translations[lang] ? lang : 'en'; // If the language is not valid, default to 'en'
}

// Function to update text content based on selected language
function updateTextContent(selectedLang) {
	const { welcome, twoDPong, threeDPong, gameModeSel, oneVone, tournament } = translations[selectedLang];

	// Update text content
	document.getElementById('welcome-title').innerText = welcome;
	document.getElementById('2d-pong').innerText = twoDPong;
	document.getElementById('3d-pong').innerText = threeDPong;
	document.getElementById('2d-mode-select-title').innerText = gameModeSel;
	document.getElementById('2D-1V1').innerText = oneVone;
	document.getElementById('3D-1V1').innerText = oneVone;
	document.getElementById('2D-tournament').innerText = tournament;
	document.getElementById('3D-tournament').innerText = tournament;

	// Hide the language selection menu
	document.getElementById('language-options').style.display = 'none';
}

// Function to handle hash changes (when the page loads or the hash changes)
function handleHashChange() {
	const hash = window.location.hash.substring(1); // Remove the "#"
	const [lang, page] = hash.split('/'); // Extract language and page from the hash

	// Update the text content based on the language
	const selectedLang = translations[lang] ? lang : 'en'; // If the language is not valid, default to 'en'
	updateTextContent(selectedLang);

	// Navigate to the appropriate page
	if (page === '2d-pong')
		show2DPongModeSelCont();
	else if (page === '3d-pong')
		show3DPongModeSelCont();
	else
		showGameSelCont();
}

// Function to toggle the language selection menu
function langSelect() {
	let languageOptions = document.getElementById('language-options');
	if (languageOptions.style.display === 'none')
		languageOptions.style.display = 'block';
	else
		languageOptions.style.display = 'none';
}

// Function to handle language changes
function addLanguageChangeListeners() {
	document.querySelectorAll('.lang-btn').forEach(button => {
		button.addEventListener('click', () => {
			const selectedLang = button.getAttribute('data-lang');
			const currentHash = window.location.hash.substring(1);
			const [, currentPage] = currentHash.split('/'); // Extract the current page from the hash
			const page = currentPage || 'home'; // Default to 'home' if no page is found

			// Update the hash with the new language and the current page
			window.location.hash = `#${selectedLang}/${page}`;

			// Update text content
			updateTextContent(selectedLang);
		});
	});
}

// Add language change listeners
addLanguageChangeListeners();

// Handle hash changes
window.addEventListener('hashchange', handleHashChange);

// Handle page load (check the hash and apply the correct language and page)
window.addEventListener('load', handleHashChange);

languageButton.addEventListener('click', langSelect);

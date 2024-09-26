const languageButton = document.getElementById('globe-icon');

// Translations
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

// Function to update text content based on selected language
function updateTextContent(selectedLang) {
	const { welcome, twoDPong, threeDPong, gameModeSel, oneVone, tournament } = translations[selectedLang];

	// Update text content
	document.getElementById('welcome-title').innerText = welcome;
	document.getElementById('2d-pong').innerText = twoDPong;
	document.getElementById('3d-pong').innerText = threeDPong;
	document.getElementById('2d-mode-select-title').innerText = gameModeSel;
	document.getElementById('3d-mode-select-title').innerText = gameModeSel;
	document.getElementById('2D-1V1').innerText = oneVone;
	document.getElementById('3D-1V1').innerText = oneVone;
	document.getElementById('2D-tournament').innerText = tournament;
	document.getElementById('3D-tournament').innerText = tournament;

	// Hide the language selection menu
	document.getElementById('language-options').style.display = 'none';
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
			const [, currentPage] = currentHash.split('/');
			const page = currentPage || 'game-select'; // Default to 'game-select'

			window.location.hash = `#${selectedLang}/${page}`;

			updateTextContent(selectedLang);
		});
	});
}

// Add language change listeners
addLanguageChangeListeners();

// Language button click listener
languageButton.addEventListener('click', langSelect);

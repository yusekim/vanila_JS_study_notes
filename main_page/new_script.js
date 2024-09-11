// Select elements
const mainContent = document.getElementById('game-select');
const newContent = document.getElementById('2d-mode-select');
const twoDPongButton = document.getElementById('2d-pong-btn');
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

// 언어를 변경하는 함수
function updateTextContent(selectedLang) {
	const { welcome, twoDPong, threeDPong, gameModeSel, oneVone, tournament } = translations[selectedLang];

	// 각 텍스트 요소를 업데이트
	document.getElementById('welcome-title').innerText = welcome;
	document.getElementById('2d-pong').innerText = twoDPong;
	document.getElementById('3d-pong').innerText = threeDPong;
	document.getElementById('2d-mode-select-title').innerText = gameModeSel;
	document.getElementById('1V1').innerText = oneVone;
	document.getElementById('tournament').innerText = tournament;

	// 언어 선택 메뉴 숨기기
	document.getElementById('language-options').style.display = 'none';
}

// 이벤트 리스너 추가 함수
function addLanguageChangeListeners() {
	document.querySelectorAll('.lang-btn').forEach(button => {
		button.addEventListener('click', () => {
			const selectedLang = button.getAttribute('data-lang');
			updateTextContent(selectedLang);
		});
	});
}

// 언어 변경 리스너 설정
addLanguageChangeListeners();

languageButton.addEventListener('click', langSelect)

const languageButton = document.getElementById('globe-icon');

// Translations
export const languages = {
	en: {
		welcome: "WELCOME TO PONG!",
		twoDPong: "2D Pong",
		threeDPong: "3D Pong",
		gameModeSel: "SELECT YOUR GAME MODE",
		oneVone: "1V1",
		tournament: "Tournament",
		threeDBallSpd: "Ball speed",
		threeDBallCol: "Ball color",
		threeDStart: "Let's go!",
		goBack: "Back",
	},
	ko: {
		welcome: "PONG에 오신 것을 환영합니다!",
		twoDPong: "평면 Pong",
		threeDPong: "입체 Pong",
		gameModeSel: "원하시는 게임 방식을 선택하세요",
		oneVone: "일대일",
		tournament: "토너먼트",
		threeDBallSpd: "공의 속도",
		threeDBallCol: "공의 색깔",
		threeDStart: "게임 시작!",
		goBack: "뒤로가기",
	},
	ja: {
		welcome: "PONGへようこそ!",
		twoDPong: "平面 Pong",
		threeDPong: "立体 Pong",
		gameModeSel: "ゲームモードを選択",
		oneVone: "一対一",
		tournament: "トーナメント",
		threeDBallSpd: "速度",
		threeDBallCol: "色",
		threeDStart: "ゲームスタート!",
		goBack: "前のページへ",
	}
};

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
		});
	});
}

// Add language change listeners
addLanguageChangeListeners();

// Language button click listener
languageButton.addEventListener('click', langSelect);

const gameSelPage = document.getElementById('game-select');
const twoDModeSelPage = document.getElementById('2d-mode-select');
const threeDModeSelPage = document.getElementById('3d-mode-select');
let ignoreHashChange = false;
// 해시 변경 시 이벤트 무시 여부를 관리하는 boolean 플래그.
// 언어를 바꿀때, changeContentPage()함수가 두번씩 호출되는걸 포착해서 이를 막기 위해서 설정.

// Function to change the displayed content page
function changeContentPage(page) {
	ignoreHashChange = true;

	gameSelPage.style.display = 'none';
	twoDModeSelPage.style.display = 'none';
	threeDModeSelPage.style.display = 'none';

	if (document.getElementById(page) === null)
		page = 'game-select';
	// Show the selected page
	document.getElementById(page).style.display = 'block';

	// Update the URL hash
	const currentLang = getCurrentLanguageFromHash();
	window.location.hash = `#${currentLang}/` + page;

	setTimeout(() => { ignoreHashChange = false; }, 100);
}

// Function to get the current language from the hash
function getCurrentLanguageFromHash() {
	const hash = window.location.hash.substring(1);
	const [lang] = hash.split('/');
	return translations[lang] ? lang : 'en'; // Default to 'en' if invalid
}

// Function to handle hash changes
function handleHashChange() {
	// 불필요한 이중호출 방지
	if (ignoreHashChange) return;
	const hash = window.location.hash.substring(1); // Remove the "#"
	const [lang, page] = hash.split('/'); // Extract language and page

	// 언어 바뀌었는지 확인, 지원하지 않는 언어의 경우 기본설정 en
	const selectedLang = translations[lang] ? lang : 'en';
	updateTextContent(selectedLang);

	// Navigate to the appropriate page
	changeContentPage(page);
}

// 주소갱신 이벤트 처리
window.addEventListener('hashchange', handleHashChange);

// 새로고침 이벤트 처리
window.addEventListener('load', handleHashChange);

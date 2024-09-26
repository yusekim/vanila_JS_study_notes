const appContainer = document.getElementById("app");
import { languages } from "../language.js";
import { renderPage } from "../router/router.js";

export function twoDModeSel(currentLanguage) {
	appContainer.innerHTML = `
	<h1 id="2d-mode-select-title" class="title-text">${languages[currentLanguage].gameModeSel}</h1>
	<div class="button-container">
	<button id="two-1V1-btn" class="button">
	<img src="./img/mode_select/fist-bump.png">
	<span id="2D-1V1" class="text">${languages[currentLanguage].oneVone}</span>
	</button>

	<button id="two-tournament-btn" class="button2">
	<img src="./img/mode_select/Trophy-icon.png">
	<span id="2D-tournament" class="text">${languages[currentLanguage].tournament}</span>
	</button>
	</div>
	`
	const twoDBackBtn = document.getElementById('2d-back-button');
	if (twoDBackBtn)
	twoDBackBtn.addEventListener('click', () => renderPage('game-select', 0));
}


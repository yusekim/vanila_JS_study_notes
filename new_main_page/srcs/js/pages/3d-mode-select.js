const appContainer = document.getElementById("app");
import { languages } from "../language.js";
import { renderPage } from "../router/router.js";

export function threeDModeSel(currentLanguage) {
	appContainer.innerHTML = `
	<h1 id="3d-mode-select-title" class="title-text">${languages[currentLanguage].gameModeSel}</h1>
	<div class="button-container">
	<button id="three-1V1-btn" class="button">
	<img src="./img/mode_select/3D-fist.png">
	<span id="3D-1V1" class="text">${languages[currentLanguage].oneVone}</span>
	</button>

	<button id="three-tournament-btn" class="button2">
	<img src="./img/mode_select/3D-trophy.png">
	<span id="3D-tournament" class="text">${languages[currentLanguage].tournament}</span>
	</div>
	`
	const oneVoneBtn = document.getElementById('three-1V1-btn');
	if (oneVoneBtn)
		oneVoneBtn.addEventListener('click', () => renderPage('3d-setting'))
}


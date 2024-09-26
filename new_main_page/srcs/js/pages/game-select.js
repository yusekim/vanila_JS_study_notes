const appContainer = document.getElementById("app");
import { languages } from "../language.js";
import { renderPage } from "../router/router.js";

export function gameSelect(currentLanguage) {
	appContainer.innerHTML = `
	<h1 id="welcome-title" class="title-text">${languages[currentLanguage].welcome}</h1>
	<div class="button-container" style="margin-bottom: 2vw;">
	<button id="2d-pong-btn" class="button">
	<img src="./img/game_select/2d-pong.png" alt="2d image">
	<span id="2d-pong" class="text">${languages[currentLanguage].twoDPong}</span>
	</button>

	<button id="3d-pong-btn" class="button2">
	<img src="./img/game_select/3d-pong.png" alt="3d image">
	<span id="3d-pong" class="text">${languages[currentLanguage].threeDPong}</span>
	</button>
	</div>
	`
	const twoDPongSelBtn = document.getElementById('2d-pong-btn');
	const threeDPongSelBtn = document.getElementById('3d-pong-btn');

	if (twoDPongSelBtn && threeDPongSelBtn) {
		twoDPongSelBtn.addEventListener('click', () => renderPage('2d-mode-select'));
		threeDPongSelBtn.addEventListener('click', () => renderPage('3d-mode-select'));
	}
}


const appContainer = document.getElementById("app");
import { App } from "../game/3D/option-select.js";
import { renderPage } from "../router/router.js";
import { languages } from "../language.js";
export let appInstance = null;

export function threeDSetting(currentLanguage) {
	console.log('here');
	appContainer.innerHTML = `
	<div id="webgl-container"></div>
	<div class="setting-container">
		<form class="selection" id="ball-speed">
			<div>${languages[currentLanguage].threeDBallSpd}:</div>
			<label><input type="radio" name="speed" value="1" required checked> ${languages[currentLanguage].threeDEasy}</label><br>
			<label><input type="radio" name="speed" value="1.5"> ${languages[currentLanguage].threeDHard}</label><br>
		</form>

		<form class="selection" id="ball-color">
			<div>${languages[currentLanguage].threeDBallCol}:</div>
			<label style="color: #8A2BE2;"><input type="radio" name="color" value="0" required checked > ⬤ </label><br>
			<label style="color: #C0C0C0;"><input type="radio" name="color" value="1"> ⬤</label><br>
			<label style="color: #FF00FF;"><input type="radio" name="color" value="2"> ⬤</label><br>
		</form>
		<button class="back-button" id="game-start">${languages[currentLanguage].threeDStart}</button>
		<button class="back-button" id="3d-back-button">${languages[currentLanguage].goBack}</button>
	</div>
	`

	const startBtn = document.getElementById('game-start');
	const backBtn = document.getElementById('3d-back-button');

	if (startBtn && backBtn) {
		// 기존 App 인스턴스가 있다면 해제
		if (appInstance) {
			appInstance.dispose();
			appInstance = null;
		}

		// 새로운 App 인스턴스 생성
		appInstance = new App();
		appInstance.startAnimation(); // 애니메이션 시작 (만약 startAnimation 메서드를 분리했다면)
	}
}

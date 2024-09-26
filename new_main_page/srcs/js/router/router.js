// const appContainer = document.getElementById("app");
// index.html의 <div>를 갈아끼우는식으로 작동함

import { gameSelect } from '../pages/game-select.js';
import { twoDModeSel } from '../pages/2d-mode-select.js';
import { threeDModeSel } from '../pages/3d-mode-select.js';
import { threeDSetting } from '../pages/3d-setting.js';
const funcArray = [gameSelect, twoDModeSel, threeDModeSel, threeDSetting];
export const supportLangs = ['en', 'kr', 'jp'];
// 함수 배열, 각각의 함수는 대응되는 페이지의 내용을 랜더링해줌

import { languages } from '../language.js';

let ignoreHashChange = false;
// 해시 변경 시 이벤트 무시 여부를 관리하는 boolean 플래그.
// 언어를 바꿀때, randerPage()함수가 두번씩 호출되는걸 포착해서 이를 막기 위해서 설정.

const hashList = [
	'game-select',
	'2d-mode-select',
	'3d-mode-select',
	'3d-setting'
];

export function renderPage(hash) {
	ignoreHashChange = true;
	console.log(hash);

	const currentLang = getCurLangHash();
	funcArray[hashList.indexOf(hash)](currentLang);
	window.location.hash = `#${currentLang}/` + hash;


	setTimeout(() => { ignoreHashChange =false; }, 50);
}

function getCurLangHash() {
	const hash = window.location.hash.substring(1);
	const [lang] = hash.split('/');
	return languages[lang] ? lang : 'en';
}

function handleHashChange() {
	if (ignoreHashChange)
		return;
	const hash = window.location.hash.substring(1); // "#" 문자 지우기
	let [lang, page] = hash.split('/'); // 언어설정, 현 페이지 주소 분리

	const hashIdx = hashList.indexOf(page);
	if (hashIdx === -1) // 유효한 hash주솟값인지 확인
		page = 'game-select';
	renderPage(page);
}

window.addEventListener('hashchange', handleHashChange);
// 주소갱신 이벤트

window.addEventListener('load', handleHashChange);
// 새로고침 이벤트

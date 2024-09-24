const threeDSettingButton = document.getElementById('three-tournament-btn');

const twoDBackButton = document.getElementById('2d-back-button');
const threeDBackButton = document.getElementById('3d-back-button');
// Back button event listeners

twoDBackButton.addEventListener('click', () => changeContentPage('game-select'));
threeDBackButton.addEventListener('click', () => changeContentPage('game-select'));
threeDSettingButton.addEventListener('click', () => changeContentPage('setting-3D'));

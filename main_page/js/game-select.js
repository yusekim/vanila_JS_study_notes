const twoDPongButton = document.getElementById('2d-pong-btn');
const threeDPongButton = document.getElementById('3d-pong-btn');
// Event listeners with anonymous functions to prevent immediate execution
twoDPongButton.addEventListener('click', () => changeContentPage('2d-mode-select'));
threeDPongButton.addEventListener('click', () => changeContentPage('3d-mode-select'));


const twoDPongButton = document.getElementById('2D-pong-button');
const threeDPongButton = document.getElementById('3D-pong-button');
const languageButton = document.getElementById('language-button');
const profileInfo = document.querySelector("div.profile-info");
const userPage = document.getElementById('user-page');
const userNameElement = document.getElementById('user-name');
const userEmailElement = document.getElementById('user-email');
const userBioElement = document.getElementById('user-bio');
const matchHistoryList = document.getElementById('match-history');





// User profile click handlers
profileInfo.addEventListener('click', showUserPage);

function showUserPage() {
  userPage.classList.remove('hidden');

  // Example: Fetch user data and update user page elements
  // ...
  userNameElement.textContent = 'John Doe'; // Replace with actual user name
  userEmailElement.textContent = 'john.doe@example.com'; // Replace with actual user email
  userBioElement.textContent = 'This is a sample bio.'; // Replace with actual user bio

  // Example: Fetch match history and populate list
  // ...
  const matchHistory = [
    { date: '2023-10-26', opponent: 'Alice', result: 'Win' },
    { date: '2023-10-25', opponent: 'Bob', result: 'Loss' },
    // ... more match history items
  ];

  matchHistory.forEach(match => {
    const listItem = document.createElement('li');
    listItem.textContent = `${match.date} - ${match.opponent} (${match.result})`;
    matchHistoryList.appendChild(listItem);
  });
}

// Close user page when clicking outside
userPage.addEventListener('click', (event) => {
  if (event.target === userPage) {
    userPage.classList.add('hidden');
  }
});

document.getElementById('language-icon').addEventListener('click', function () {
  var languageOptions = document.getElementById('language-options');
  if (languageOptions.style.display === 'none') {
      languageOptions.style.display = 'block';
  } else {
      languageOptions.style.display = 'none';
  }
});

const translations = {
  en: {
      welcome: "Welcome to Pong!",
      twoDPong: "2D Pong",
      threeDPong: "3D Pong",
  },
  ko: {
      welcome: "Pong 에 오신 것을 환영합니다!",
      twoDPong: "평면 Pong",
      threeDPong: "입체 Pong",
  },
  ja: {
      welcome: "Pongへようこそ！",
      twoDPong: "平面 Pong",
      threeDPong: "立体 Pong",
  }
};

document.querySelectorAll('.lang-btn').forEach(function(button) {
  button.addEventListener('click', function() {
      var selectedLang = this.getAttribute('data-lang');
      document.getElementById('welcome-text').innerText = translations[selectedLang].welcome;
      document.querySelector('#2D-text .text').innerText = translations[selectedLang].twoDPong; // 텍스트만 변경
      document.querySelector('#3D-text .text').innerText = translations[selectedLang].threeDPong; // 텍스트만 변경
      document.getElementById('language-options').style.display = 'none'; // 언어 선택 후 숨기기
  });
});

// 언어 선택 버튼 외부를 클릭하면 버튼들을 숨기는 로직 추가
document.addEventListener('click', function(event) {
  const languageOptions = document.getElementById('language-options');
  const languageIcon = document.getElementById('language-icon');

  // 클릭한 요소가 언어 버튼들이나 아이콘이 아니면 언어 선택 메뉴를 숨김
  if (!languageOptions.contains(event.target) && !languageIcon.contains(event.target)) {
      languageOptions.style.display = 'none';
  }
});

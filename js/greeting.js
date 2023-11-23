const loginForm = document.querySelector('#login-form__box');
const loginInput = loginForm.querySelector('#login-form input');
const title = document.querySelector('#greeting');
const todoBox = document.querySelector('.todo-box');
const logoutBtn = document.querySelector('#logout');
// HTML 요소들을 변수에 할당

const USERNAME_KEY = 'username';
// localStorage에 key name으로 쓰일 username을 변수로 할당하여 error 최소화 및 버그 발견하기 용이하게함.

const HIDDEN_CLASSNAME = 'hidden';

function handleToSubmit(event) {
  event.preventDefault();
  //submit event 발생 시에 기본 행동(페이지 새로고침) 방지.
  const username = loginInput.value;
  // input에 입력한 값을 변수에 할당
  paintGreetings(username);
  // paintGreetings 함수 실행, 매개변수로는 username 사용
  localStorage.setItem(USERNAME_KEY, username);
  // localStorage의 "username"이라는 key에 사용자가 입력한 값을 저장
  loginInput.value = '';
  //logout시 이전 입력 값이 남아있는 걸 방지 하기 위해 input value에 빈 string 값을 넣어줌
}
// submit event의 기본 동작 새로고침을 막고, 사용자 입력값을 변수에 할당한 후 paintgreetings 힘수의 매개변수로 그 값을 사용하며 호출하고 localStorage에 그 값을 저장한다.

function paintGreetings(username) {
  //login 전엔 todo form과 todo ul을 숨기기 위해 변수로 선언 후 후에 class hidden을 remove 해줌
  loginForm.classList.add(HIDDEN_CLASSNAME);
  //loginform에 "hidden" class 추가  === display:none
  greeting.classList.remove(HIDDEN_CLASSNAME);
  //greeting에 "hidden" class 제거  === display:none => display:block
  logoutBtn.classList.remove(HIDDEN_CLASSNAME);
  todoBox.classList.remove(HIDDEN_CLASSNAME);
  title.innerText = `Hello, ${username}`;
  // 함수 실행시 h1의 textnode에 username이라는 매개변수를 받아서 화면에 출력
  // handleToSubmit에서 호출 시에는 input.value
  // 밑 if문에서는 savedUserName이 그에 해당
}

const savedUserName = localStorage.getItem(USERNAME_KEY);
// localStorage에 저장된 사용자 입력 값을 변수에 할당

if (savedUserName !== null) {
  paintGreetings(savedUserName); //savedUserName !== null -> 저장된 사용자 입력 값이 있다면 paintGreetings 함수를 savedUserName을 매개변수로 활용해 호출
}
loginForm.addEventListener('submit', handleToSubmit);
//submit event를 감지하며 대기, submit event 발생하면 handleToSubmit 함수 호출

logoutBtn.addEventListener('click', logout);
//로그아웃 버튼이 클릭될 때 까지 기다렸다가 클릭 이벤트 발생하면 logout()함수 호출

function logout() {
  localStorage.removeItem(USERNAME_KEY);
  //유저 입력값 저장해놓은 localStorage item 삭제
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  greeting.classList.add(HIDDEN_CLASSNAME);
  todoBox.classList.add(HIDDEN_CLASSNAME);
  logoutBtn.classList.add(HIDDEN_CLASSNAME);
  // 숨길 요소는 hidden 클래스 추가, 보일 요소는 hidden 클래스 삭제
  greeting.innerText = '';
  // h1에 text node값 비워줌.
}

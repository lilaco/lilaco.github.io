const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

// 일반적으로 String만 포함된 변수는 대문자로 표기하고 String을 저장하고 싶을 때 사용.
// 변수명이 오타가 나면 자바스크립트가 지적해 주기때문에 typo 체크가 용이.
const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

// function 에 event argument를 추가하여 event 를 컨트롤한다. (해당 argument의 명명은 관행으로 'event'라 한다. potato라 적어도 됨.)
function onLoginSubmit(event) {
    // 어떤 event의 기본행동이든지 발생되지 않도록 막는다.
    event.preventDefault();
    loginForm.classList.add(HIDDEN_CLASSNAME);
    const username = loginInput.value;

    // localStorage에 username 값을 저장. (key, value)
    localStorage.setItem(USERNAME_KEY, username);
    
    paintGreetings(username);
}

// greeting의 입력과 hidden class를 제거하는 것이 반복 사용되어 function으로 처리
function paintGreetings(username){
    greeting.innerText = `Hello ${username}! 🤗`;
    greeting.classList.remove(HIDDEN_CLASSNAME);
}

// localStorage에 username 유무 확인
// 유저정보가 없다면 form을 보여주기
// 있다면 h1으로 보여주기.
const savedUsername = localStorage.getItem(USERNAME_KEY);

if(savedUsername === null){
    // show the form
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", onLoginSubmit);
} else {
    // show the h1
    paintGreetings(savedUsername);
    
}
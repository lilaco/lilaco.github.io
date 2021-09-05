const toDoForm = document.getElementById("todo-form");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos"

// To do list를 저장하기 위한 array 선언.
// application이 시작될 때, toDos array는 항상 비어있기 때문에 새로고침을 하면, 이전의 localstorage의 데이터가 삭제된다.
// const -> let으로 변경하여 데이터 변경이 가능토록 한다.
let toDos = [];

function saveToDos(){
    // Javascript 객체(Object) 나 배열(Array) 를 String으로 변환 할 수 있다.
    localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

function deleteToDo(event){
    // console.dir 을 통해서 버튼에 해당하는 li를 찾아갈 수 있다. 지금은 target.parentElement 또는 target.parentNode로 추적가능
    // target은 클릭된 HTML Element
    // console.log(event.target.parentElement);

    // 따라서 클릭하면 삭제하고 싶은 li를 다음과 같이 정의할 수 있다.
    const li = event.target.parentElement;

    // HTML 을 지울 수 있지만, localStorage에서는 지울 수 없다.
    li.remove();

     //클릭한 Todo의 id는 삭제하고 나머지는 남긴다.
    toDos = toDos.filter(toDo => toDo.id !== parseInt(li.id));
    saveToDos();//saveToDos를 통하여 배열의 변경된 사항을 다시 저장.

}

function paintToDo(newTodo){
    // 속성 추가하기
    const li = document.createElement("li");
    // li에 Object id 를 추가하기.
    li.id = newTodo.id;
    const span = document.createElement("span");
    span.innerText = newTodo.text; // Object 로 받는 것을 text로 받기 위해 .text 추가.
    const button = document.createElement("button");
    button.innerText = "❌"
    button.addEventListener("click", deleteToDo);

    // li 태그 내부에 span 태그 , button 추가
    li.appendChild(span);
    li.appendChild(button);
    toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
    event.preventDefault();
    // input에 현재 내용을 복사. 이미 newTodo 변수에 값을 저장했기 때문에 이후의 value는 신경쓰지 않아도 됨.
    const newTodo = toDoInput.value;
    toDoInput.value = "";
    
    //To do list 데이터가 입력될때, 기존의 text 방식으로 입력하지 않고, 객체로 입력받는다.
    const newTodoObj = {
        text:newTodo,
        id: Date.now(), // 매번 1000밀리초마다 랜덤 ID인 것 처럼 현재 시간에 대한 숫자 데이터를 받아낸다.
    };
    // To do list가 저장되는 부분(String text)
    //toDos.push(newTodo);
    toDos.push(newTodoObj);
    // paintToDo(newTodo);
    paintToDo(newTodoObj);
    saveToDos();
}

toDoForm.addEventListener("submit", handleToDoSubmit);

// 람다를 사용하지 않을때, function으로 선언하여 사용해도 됨.
function sayHello(item){
    console.log("This is the turn of", item);
}

const savedToDos = localStorage.getItem(TODOS_KEY);

// ToDos가 없을때 처리
if(savedToDos){
    const parsedToDos = JSON.parse(savedToDos);
    // sayHello fucntion 호출이 아닌 람다를 사용하여 forEach 구문 완성.(short-cut)
    // parsedToDos.forEach((item) => console.log("This is the turn of ", item));

    //toDos 배열에 새로 입력한 toDo 데이터를 저장.
    toDos = parsedToDos;
    parsedToDos.forEach(paintToDo); // 이 과정에서 새로고침을 해도 기존에 입력한 To Do list를 저장한다. 
}

// filter에서 array의 item을 유지하고 싶으면 true를 return 해야함.
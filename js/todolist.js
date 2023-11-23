const todoForm = document.querySelector('#todo-form');
const todoList = document.querySelector('#todo-list');
const deleteAllBtn = document.querySelector('#del-all__btn');
const todoInput = todoForm.querySelector('#todo-form input');
//html 요소 변수로 할당
let todos = [];
//let으로 선언한 이유 : 이 후에 todos에 savedTodos 값을 넣기 때문에 const 대신 let으로 todos array를 선언함
// 이 todos엔 유저 입력 값이 text property로, Date.now()로 받은 시간값이 id로 들어갈 것
const TODOS_KEY = 'todos';
// localStorage에 저장될 key 값을 변수로 선언(error 최소화)

function deleteTodo(event) {
  const li = this.parentNode;
  // 이것은 지역변수로 밑의 함수 paintTodos의 li와 별개로 선언이 가능하다. 함수내에서만 사용이 가능
  // 이 code는 const li = event.target.parentNode 와 동일
  todos = todos.filter((element) => element.id !== parseInt(li.id));
  //  todos.filter를 통해 각각의 오브젝트들의 id와 li의 id가 동일 여부를 검사하고 두 값이 서로 같지않은(return값이 true이면) 오브젝트만 있는 새로운 array를 어내고 그 것을 todos array에 저장한다.
  // 동일한 입력 값이 있는 li의 삭제시 변별성을 부여하기 위함임.
  //HTML요소의 속성값은 자바스크립트에서 string 형태로 인식하기 때문에 todos.id와 data type이 달라 값이 비교가 불가능하다. 그렇기에 parseInt를 통해 string값을 interger화 시켜줌.
  li.remove();
  // click한 button을 자식으로 가진 li 요소 삭제.
  saveToDos();
  // localStorage에 값을 update 한다.
}

function deleteAllTodo() {
  todos = [];
  saveToDos();
  todoList.textContent = '';
}
// 전체 삭제 기능 구현 , 버튼을 누르면 todos 배열을 빈 array로 초기화 하고 이를 localStorage에 저장, todoList ul 요소의 자식요소를 모두 없애기 위해 text.content value를 빈 string을 넣어줌으로써 모든 자식요소를 삭제한다. (ul의 textnode를 포함한 모든 자식요소를 지워줌)

deleteAllBtn.addEventListener('click', deleteAllTodo);
//deleteAllBtn 클릭 감지하면 deletoAlltodo 함수 호출

function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}
// localStorage에 입력 값을 저장하는 함수, 이 때 localStorage에는 객체/배열 형태를 유지하며 저장할 수 없기 때문에 JSON.stringify를 이용한다
// JSON.stringify -> 자바스크립트 객체를 JSON이 읽을 수 있는 data형태로 변환해주는 함수이다.
function paintToDos(todo) {
  const li = document.createElement('li');
  li.id = todo.id;
  //li 요소를 생성하고 이를 li라는 변수에 할당, 이때 li에 id 속성을 부여하고 그 값은 todos array의 id property의 value로 주도록 한다.
  const span = document.createElement('span');
  span.innerText = `📌 ${todo.text}`;
  //span 요소를 생성하고 이를 span이라는 변수에 할당. textnode로 todos array의 text property value 값을 주도록 한다.

  const btn = document.createElement('button');
  btn.innerText = 'X';
  //button 요소를 생성하고 이를 btn이라는 변수에 할당. textnode로 "x"를 입력
  btn.addEventListener('click', deleteTodo);
  // btn에 click 이벤트가 발생하면 deleteTodo 함수 호출

  li.appendChild(span);
  li.appendChild(btn);
  // 위에 생성한 li 요소의 자식요소로 span과 button요소를 추가함

  todoList.appendChild(li);
  // todolist ul에 li 요소를 자식요소로 추가. li가 화면에 출력됨.
}

function onTodoSubmit(event) {
  event.preventDefault();
  // submit event 발생시 브라우저 기본 동작 방지용 (새로고침을 막아준다.)
  const newTodo = todoInput.value;
  //사용자 입력 값을 newTodo 변수에 할당
  const newTodoObj = { text: newTodo, id: Date.now() };
  todos.push(newTodoObj);
  //todos array에 newTodoObj의 형태의 객체를 추가해줌. 사용자 입력값과 id를 부여하기 위함
  paintToDos(newTodoObj);
  //newTodoObj를 argument로 활용해 paintTodos 함수 호출
  saveToDos();
  // localStorage에 저장
  todoInput.value = '';
  //submit event 발생 후 input 입력 창을 비워주기 위해 빈 string을 넣어줌
}

const savedToDos = JSON.parse(localStorage.getItem(TODOS_KEY));
//localStorage에 저장된 값을 불러와 변수에 할당
//JSON.parse 함수를 통해 string 형태로 되어있던 저장값을 array화 시켜줌
//JSON.parse => JSON data type을 자바스크립트가 읽을 수 있는 객체로 변환시켜준다

if (savedToDos !== null) {
  todos = savedToDos;
  todos.forEach(paintToDos);
}
//localStorage에 저장된 값이 있으면 저장 값을 todos에 옮겨주고 array의 각 item 마다 함수를 호출시키는 forEach를 통해 paintToDos 함수를 호출
//ForEach의 경우 각 배열 요소에 대해 제공된 함수를 한 번씩 실행하는 메서드이며 이 때 인자는 각 배열 요소가 사용된다.
todoForm.addEventListener('submit', onTodoSubmit);
//submit event가 발생하면 onTodoSubmit 함수를 호출한다.

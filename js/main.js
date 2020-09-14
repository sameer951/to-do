var inputField = document.getElementById('itemInput');
const addBtn = document.getElementById('addButton');
var todoList = document.getElementById('todoList');
var listArray = [];
var todo = { data: 'Hi', isCompleted: false }
var removeItem = (data) => {
    let list = localStorage.getItem('todoList');
    let listArray = list ? JSON.parse(list) : [];
    for (var i = 0; i < listArray.length; i++) {
        if (listArray[i].data == data) {
            listArray.splice(i, 1);
            localStorage.setItem('todoList', JSON.stringify(listArray));
            addTodo(true);
            break;
        }
    }
}

var chageCompete = (data) => {
    // var data = this.parentElement.innerText;
    let list = localStorage.getItem('todoList');
   let listArray = list ? JSON.parse(list) : [];
    for (var i = 0; i < listArray.length; i++) {
        if (listArray[i].data == data) {
            listArray[i].isCompleted = !listArray[i].isCompleted;
            localStorage.setItem('todoList', JSON.stringify(listArray));
            addTodo(true);
            break;
        }
    }
}
var createItem = (todo) => {
    let li = document.createElement('li');
    li.innerHTML = todo.data;
    li.className = !todo.isCompleted ? 'list-group-item list-group-item-warning m-1' : 'list-group-item list-group-item-success m-1';
    li.addEventListener('click', () => chageCompete(todo.data));
    var itemIncompBtn = document.createElement('button');
    itemIncompBtn.className = 'btn btn-danger';
    itemIncompBtn.innerText = 'X';
    itemIncompBtn.className = "badge float-right";
    itemIncompBtn.addEventListener('click', () => removeItem(todo.data));
    li.appendChild(itemIncompBtn);
    todoList.appendChild(li);
}
var addTodo = (isLoad = false) => {
    todo.data = inputField.value || inputField.nodeValue;
    if (todo.data || isLoad) {
        let list = localStorage.getItem('todoList');
        listArray = list ? JSON.parse(list) : [];
        if (todo.data) {
            listArray.push(todo);
        }
        localStorage.setItem('todoList', JSON.stringify(listArray));
        inputField.value = '';
        todoList.innerHTML = ''
        listArray.forEach((todo) => {
            createItem(todo);
        })
    }
}
var downHandler = (e) => {
    // console.log(e);
    if (e.key === 'Enter') {
        addTodo();
    }
}

addBtn.addEventListener('click', addTodo);
window.addEventListener("keydown", downHandler);
addTodo(true);


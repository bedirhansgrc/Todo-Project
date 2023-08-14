//Tüm Elementleri Seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group")
const firstCardBody = document.querySelectorAll(".card-body")[0]
const secondCardBody = document.querySelectorAll(".card-body")[1]
const filter = document.querySelector("#filter")
const clearButton = document.querySelector("#clear-todos")

eventListeners();

function eventListeners() { //Tüm event listenerlar
    form.addEventListener("submit", addTodo)
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
}
function loadAllTodosToUI(){
    let todos = getTodosFromStorage()

    todos.forEach(function(todo){
        addTodoToUI(todo);
        
    })
}
function addTodo(e) {
    const newTodo = todoInput.value.trim()
    if (newTodo === "") {
       
        showAlert("danger", "Lütfen bir todo girin");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo)
        showAlert("success", "Todo başarıyla eklendi")
    }
    e.preventDefault();
}
function getTodosFromStorage(){ // Storagedan Todoları Alma
    let todos

    if (localStorage.getItem("todos") === null){
        todos = []
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    return todos
}
function addTodoToStorage(newTodo){
    let todos = getTodosFromStorage()
    todos.push(newTodo)
    localStorage.setItem("todos",JSON.stringify(todos))
}
function showAlert(type, message) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`
    alert.textContent = message

    firstCardBody.appendChild(alert)

    //setTimeout

    setTimeout(function(){
    alert.remove()
    },1000)
}
function addTodoToUI(newTodo) { //String değerini list item olarak UI'a ekleyecek
    //List Item Oluşturma
    const listItem = document.createElement("li");
    //Link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>"

    listItem.className = "list-group-item d-flex justify-content-between"

    //Text Node Ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link)

    //Todo List'e List Item'ı ekleme

    todoList.appendChild(listItem)
    todoInput.value = ""
}
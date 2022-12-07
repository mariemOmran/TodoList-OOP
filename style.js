// handle element
let form = document.querySelector(".form");
let input = document.querySelector(".input");
let lists = document.querySelector(".lists");
let counter = 0;

class Storatge {
    static addToLocalStorage (todoArr){
        let storage = localStorage.setItem("task",JSON.stringify(todoArr));
        return storage;
    }
    static getStorage (){
        let storage = localStorage.getItem("task") === null ? [] :JSON.parse(localStorage.getItem("task"));
        return storage;
    }
}

let todoArr = Storatge.getStorage();
form.addEventListener("submit", e =>{
    e.preventDefault();
    let newTask = new Todo( counter, input.value );
    todoArr = [...todoArr, newTask];
    counter++;
    Ui.bodyTodo();
    Ui.emptyInput();
    //Remove task
    Delete.deleteBtn();
    Delete.finish();
    // Add To Local Storage
    Storatge.addToLocalStorage(todoArr);
});

class Todo {
    constructor(id, task){
        this.id = id;
        this.task = task;
    };
};
class Ui {
    static bodyTodo (){
        let listTasks = todoArr.map(e => {
            return `<div class="todo">
                        <p class= "task">${e.task}</p>
                        <span class="remove" data-id=${e.id}>delete</span>
                    </div>`
        });
        lists.innerHTML = listTasks.join(" ");
    };
    static emptyInput (){
        input.value= "" ;
    };
};
class Delete{
    static deleteBtn (){
        lists.addEventListener("click",e => {
            let btnId = +(e.target.dataset.id);
            if(e.target.classList.contains("remove")){
                e.target.parentElement.remove();
            }
            todoArr = todoArr.filter(e => e.id !== btnId);
            Storatge.addToLocalStorage(todoArr);
        });
    };
    static finish (){
        lists.addEventListener("click",e => {
            if(e.target.classList.contains("task")){
                e.target.classList.toggle("finish");
            }
        });
    };
};
window.addEventListener("DOMContentLoaded",()=>{
    Ui.bodyTodo();
    Delete.deleteBtn();
})

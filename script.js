// let todos = [
//     {
//         text: "Breakfast",
//         status: "todo",
//         id: "3ea21f49-47d4-4e5b-b8ca-1376940c381d"
//     },
//     {
//         text: "Dinner",
//         status: "done",
//         id: "3ea21f49-47d4-4e5b-b8ca-1376940c381c"
//     }
// ];

// const changeTodoStatus = (id, status) => {
//     for (const todo of todos) {
//         if (todo.id === id) {
//             todo.status = status;
//         }
//     }
// };

// const deleteTodo = (id) => {
//     todos = todos.filter((todo) => todo.id !== id);
// };
// const ul = document.querySelector(".todos");

// const renderTodo = ({ text, id, status }) => {
//     const li = document.createElement("li");
//     li.innerText = text;

//     const checkbox = document.createElement("input");
//     checkbox.setAttribute("type", "checkbox");

//     if (status === "done") {
//         li.style.textDecoration = "line-through";
//         checkbox.checked = true;
//     }

//     const closeIcon = document.createElement("span");
//     closeIcon.innerHTML = "&times;";
//     closeIcon.style.cursor = "pointer";

//     closeIcon.addEventListener("click", (e) => {
//         deleteTodo(id);
//         renderTodos();
//     });

//     checkbox.addEventListener("change", (e) => {
//         if (checkbox.checked) {
//             changeTodoStatus(id, "done");
//         } else {
//             changeTodoStatus(id, "todo");
//         }

//         renderTodos();
//     });

//     li.appendChild(checkbox);
//     li.appendChild(closeIcon);
//     ul.appendChild(li);
// };
// const renderTodos = () => {
//     ul.innerHTML = "";
//     for (const todo of todos) {
//         renderTodo(todo);
//     }
// };

// renderTodos();

// const form = document.querySelector("form");
// form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const input = document.querySelector(".todo-input");
//     const textValue = input.value;
//     const id = crypto.randomUUID();
//     const todo = {
//         text: textValue,
//         status: "todo",
//         id: id
//     };
//     todos.push(todo);
//     input.value = "";

//     renderTodos();
// });

class Storage {
    get() {
        const todos = localStorage.getItem("todos");
        if (!todos) return [];
        return JSON.parse(todos);
    }

    add(todo) {
        const existingTodos = this.get();
        existingTodos.push(todo);
        this.setTodos(existingTodos);
    }

    delete(id) {
        const existingTodos = this.get();
        const keptTodos = existingTodos.filter((todo) => todo.id !== id);
        this.setTodos(keptTodos);
    }

    setTodos(updatedTodos) {
        localStorage.setItem("todos", JSON.stringify(updatedTodos));
    }

    changeStatus(id, status) {
        const existingTodos = this.get();
        for (const todo of existingTodos) {
            if (todo.id === id) {
                todo.status = status;
            }
        }

        this.setTodos(existingTodos);
    }
}

const storage = new Storage();

class TodoApp {
    static ul = document.querySelector(".todos");
    constructor() {
        this.todos = storage.get();
    }
    changeTodoStatus = (id, status) => {
        storage.changeStatus(id, status);
    };
    deleteTodo = (id) => {
        storage.delete(id);
    };

    addTodo = (todo) => {
        storage.add(todo);
    };

    getAll() {
        return storage.get();
    }

    renderTodo = ({ text, id, status }) => {
        const li = document.createElement("li");
        li.innerText = text;

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if (status === "done") {
            li.style.textDecoration = "line-through";
            checkbox.checked = true;
        }

        const closeIcon = document.createElement("span");
        closeIcon.innerHTML = "&times;";
        closeIcon.style.cursor = "pointer";

        closeIcon.addEventListener("click", (e) => {
            this.deleteTodo(id);
            this.renderTodos();
        });

        checkbox.addEventListener("change", (e) => {
            if (checkbox.checked) {
                this.changeTodoStatus(id, "done");
            } else {
                this.changeTodoStatus(id, "todo");
            }

            this.renderTodos();
        });

        li.appendChild(checkbox);
        li.appendChild(closeIcon);
        TodoApp.ul.appendChild(li);
    };

    renderTodos = () => {
        TodoApp.ul.innerHTML = "";
        for (const todo of this.getAll()) {
            this.renderTodo(todo);
        }
    };

    initForm = () => {
        const form = document.querySelector("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const input = document.querySelector(".todo-input");
            const textValue = input.value;

            if (textValue.length < 3) {
                return;
            }
            const id = crypto.randomUUID();
            const todo = {
                text: textValue,
                status: "todo",
                id: id
            };
            this.addTodo(todo);
            input.value = "";

            this.renderTodos();
        });
    };

    init = () => {
        this.renderTodos();
        this.initForm();
    };
}

const app = new TodoApp();
app.init();

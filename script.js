let todos = [
    {
        text: "Breakfast",
        status: "todo",
        id: "3ea21f49-47d4-4e5b-b8ca-1376940c381d"
    },
    {
        text: "Dinner",
        status: "done",
        id: "3ea21f49-47d4-4e5b-b8ca-1376940c381c"
    }
];

const changeTodoStatus = (id, status) => {
    for (const todo of todos) {
        if (todo.id === id) {
            todo.status = status;
        }
    }
};

const deleteTodo = (id) => {
    todos = todos.filter((todo) => todo.id !== id);
};
const ul = document.querySelector(".todos");

const renderTodo = ({ text, id, status }) => {
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
        deleteTodo(id);
        renderTodos();
    });

    checkbox.addEventListener("change", (e) => {
        if (checkbox.checked) {
            changeTodoStatus(id, "done");
        } else {
            changeTodoStatus(id, "todo");
        }

        renderTodos();
    });

    li.appendChild(checkbox);
    li.appendChild(closeIcon);
    ul.appendChild(li);
};
const renderTodos = () => {
    ul.innerHTML = "";
    for (const todo of todos) {
        renderTodo(todo);
    }
};

renderTodos();

const form = document.querySelector("form");
form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = document.querySelector(".todo-input");
    const textValue = input.value;
    const id = crypto.randomUUID();
    const todo = {
        text: textValue,
        status: "todo",
        id: id
    };
    todos.push(todo);
    input.value = "";

    renderTodos();
});

let tasks = [];

function addNewTask() {
    var task = {
        desc: desc.value,
        date: date.value,
        time: time.value
    }

    if (validation(task) == true) {
        tasks.push(task)
        localStorage.setItem("task", JSON.stringify(tasks));
        printTask();
    } else {
        alert('Please fill all the inputs👋🏼')
    }
}

if (localStorage.task) {
    tasks = JSON.parse(localStorage.getItem("task"));
    printTask();
}


function printTask() {
    var note_container = document.querySelector('.note_container');
    note_container.innerHTML = "";
    for (var i = 0; i < tasks.length; i++) {
        var inputDate = new Date(tasks[i].date);
        var day = inputDate.getDate();
        var month = inputDate.getMonth() + 1;
        var year = inputDate.getFullYear();
        var formattedDate = day + "/" + month + "/" + year;

        document.querySelector('.note_container').innerHTML += `
        <div class="noteContent" id="note">
        <img src="notebg.png" alt="image" />
        <i class="fa-solid fa-xmark icon" id="icon" onclick="deleteTask(${i})"></i>
        <span class="task">${tasks[i].desc}</span>
        <div class="inputDate" id="dateInput">${formattedDate}</div>
        <div class="time">${tasks[i].time}</div>
        </div>`
    }
}


function validation(inputs) {
    if (inputs.desc != '' && inputs.date != '' && inputs.time != '')
        return true;
    return false;
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("task", JSON.stringify(tasks));
    printTask();
}

function clearForm() {
    form.reset();
}



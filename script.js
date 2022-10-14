let tasks = [
    {
        "title": "قراءة كتاب",
        "date": "15/20/2022",
        "isDone": true
    },
    {
        "title": "انهاء المشروع النهائي",
        "date": "15/20/2022",
        "isDone": false
    },
    {
        "title": "انهاء كورس الجافا سكربت",
        "date": "15/20/2022",
        "isDone": false
    }
]
function getTasksFromStorage() {
    let retrievedTasks = JSON.parse(localStorage.getItem("tasks"))
    tasks = retrievedTasks ?? []

}
getTasksFromStorage()


function fillTasksOnThePage() {
    document.getElementById("tasks").innerHTML = ""
    let index = 0
    for (task of tasks) {
        let content =
            `   <div class="task ${task.isDone ? 'done' : ''}">
                        
                        <!-- TASKS INFO -->
                        <div style="width:70%;">
                            <h2>${task.title}</h2>

                            <div>
                                <span class="material-symbols-outlined">
                                    calendar_month
                                    </span>
                                <span>
                                    ${task.date}
                                </span>
                            </div>
                        </div>
                        <!--// TASKS INFO //-->

                        <!--TASKS ACTIONS -->
                        <div style="display:flex;justify-content: space-between; align-items: center;width:20%">
                            <button class="circular" style="background-color:rgb(114,0,0);color:white;">
                                <span onclick="deleteTask(${index})" class="material-symbols-outlined">delete</span>
                            </button>
                            ${task.isDone ? `
                                <button onclick="toggleTaskCompletion(${index})" class="circular" style="background-color:rgb(118,0,101);color:white;">
                                    <span class="material-symbols-outlined">
                                        cancel
                                    </span>
                            </button>`: `
                            <button onclick="toggleTaskCompletion(${index})" class="circular" style="background-color:rgb(0,150,30);color:white;">
                                <span class="material-symbols-outlined">done</span>
                            </button>
                            `}
                            
                            <button onclick="editTask(${index})" class="circular" style="background-color:rgba(0,16,197,0.692);color:white;">
                                <span class="material-symbols-outlined">edit</span>
                            </button>
                        </div>
                        <!--// TASKS ACTIONS //-->
                </div>
                `
        document.getElementById("tasks").innerHTML += content
        index++


    }
}

fillTasksOnThePage()

document.getElementById("add-btn").addEventListener("click", function () {
    let taskName = prompt("الرجاء ادخال عنوان المهمة")
    if (taskName) {
        let now = new Date()
        let date = now.getDate() + "/" + (now.getMonth() + 1) + "/" + now.getFullYear() + "|" + now.getHours() + ":" + now.getMinutes()
        let taskOjt = {
            "title": taskName,
            "date": date,
            "isDone": false
        }
        tasks.push(taskOjt)
        storeTasks()
        fillTasksOnThePage()
    }

})
function deleteTask(index) {
    let isConfirmed = confirm(`هل انت متاكد من حذف ${tasks[index].title}`)
    if (isConfirmed) {
        tasks.splice(index, 1)
        storeTasks()
        fillTasksOnThePage()
    }

}
function editTask(index) {
    let task = tasks[index]
    let newTaskTitle = prompt("الرجاء ادخال اسم المهمة", task.title)

    task.title = newTaskTitle
    storeTasks()
    fillTasksOnThePage()
}
function toggleTaskCompletion(index) {
    let task = tasks[index]
    task.isDone = !task.isDone
    storeTasks()
    fillTasksOnThePage()
}
//================ STORAGE FUNCTIONS==================

function storeTasks() {
    let tasksString = JSON.stringify(tasks)
    localStorage.setItem("tasks", tasksString)
}
let input = document.querySelector(".input");
let submit = document.querySelector(".submit");
let divtasks = document.querySelector(".tasks");
let all = document.querySelector(".all");
let arrayoftasks = [];
if (localStorage.getItem("tasks")) {
	arrayoftasks = JSON.parse(localStorage.getItem("tasks"));
}

getdatafromlocal();
submit.onclick = function () {
	if (input.value !== "") {
		Addtasktoarray(input.value);
		input.value = "";
	}
};

divtasks.addEventListener("click", (e) => {
	if (e.target.classList.contains("del")) {
		removefromlocal(e.target.parentElement.getAttribute("task-id"));
		e.target.parentElement.remove();
	}
	if (e.target.classList.contains("tsk")) {
		completelocal(e.target.getAttribute("task-id"));
		e.target.classList.toggle("done");
	}
});
function Addtasktoarray(tasks) {
	const task = {
		id: Date.now(),
		title: tasks,
		completed: false
	};

	arrayoftasks.push(task);
	addtaktolist(arrayoftasks);
	aadarraytolocal(arrayoftasks);
}

function addtaktolist(arrayoftasks) {
	divtasks.innerHTML = "";

	arrayoftasks.forEach((task) => {
		let div = document.createElement("div");
		div.className = "tsk";
		if (task.completed) {
			div.classList.add("done");
		}
		div.appendChild(document.createTextNode(task.title));
		div.setAttribute("task-id", task.id);

		let span = document.createElement("span");
		span.className = "del";
		span.appendChild(document.createTextNode("Delete"));
		div.appendChild(span);
		divtasks.appendChild(div);
	});
}

function aadarraytolocal(arrayoftasks) {
	let data = JSON.stringify(arrayoftasks);
	window.localStorage.setItem("tasks", data);
}

function getdatafromlocal() {
	let data = window.localStorage.getItem("tasks");
	if (data) {
		addtaktolist(JSON.parse(data));
	}
}

function removefromlocal(taskid) {
	arrayoftasks = arrayoftasks.filter((e) => e.id != taskid);
	aadarraytolocal(arrayoftasks);
}

function completelocal(taskid) {
	for (let i = 0; i < arrayoftasks.length; i++) {
		if (arrayoftasks[i].id == taskid) {
			arrayoftasks[i].completed == false
				? (arrayoftasks[i].completed = true)
				: (arrayoftasks[i].completed = false);
		}
	}
	aadarraytolocal(arrayoftasks);
}

all.onclick = function () {
	localStorage.clear();
	divtasks.remove();
	window.location.reload();
};

var todolistMul = []
var sort_type = {type : "", count : 0}

const checkValidateMulti = () => {
	let name_field = document.forms["todo-multi"]["name"].value
	let color_field = document.forms["todo-multi"]["color"].value
	if (name_field == "") {
		alert("Name must be filled out")
		return false
	}
	if (color_field == "") {
		alert("Color must be filled out")
		return false
	}
	return true
}

const checkValidateMultiUpd = () => {
	let name_field = document.forms["update-element"]["name"].value
	let color_field = document.forms["update-element"]["color"].value
	if (name_field == "") {
		alert("Name must be filled out")
		return false
	}
	if (color_field == "") {
		alert("Color must be filled out")
		return false
	}
	return true
}

var createItem = () => {
	if (!checkValidateMulti()) return
	const value = {}
	value.name = document.getElementById("myInputName").value
	value.color = document.getElementById("myInputColor").value
	todolistMul.push(value)
	showItems(todolistMul)
	changePage(current_page)
}

var showItems = (arr) => {
	var todo_results = [...arr]
	const tbody = document.getElementById("my-table").getElementsByTagName("tbody")[0]
	tbody.innerHTML = ''
	
	var items_close = document.getElementsByClassName('close')
	var items_edit = document.getElementsByClassName('edit')
	todo_results.map(item => {
		createLiComponent(tbody, item.name, item.color)
		document.getElementById("myInputName").value = "";
		document.getElementById("myInputColor").value = "";

		for (let i = 0; i < items_close.length; i++) {
			items_close[i].onclick = function() {
				todolistMul.splice((current_page - 1) * records_per_page + i, 1)
				showItems(todolistMul)
				current_page = 1
				changePage(1)
			}
		}

		for (let i = 0; i < items_edit.length; i++) {
			items_edit[i].onclick = function() {
				modal.style.display = "block";
				document.getElementById("id-upd").value = i
				document.forms["update-element"]["name"].value = todo_results[i].name
				document.forms["update-element"]["color"].value = todo_results[i].color
			}
		}
	})
}

var createLiComponent = (tbody, value1, value2) => {
	var new_row = tbody.insertRow()

	var new_cell_name = new_row.insertCell()
	var new_text_name = document.createTextNode(value1)
	new_cell_name.append(new_text_name)
	
	var new_cell_color = new_row.insertCell()
	var new_text_color = document.createTextNode(value2)
	new_cell_color.append(new_text_color)

	var new_cell_action = new_row.insertCell()
	var span_delete = document.createElement("SPAN");
	var txt_delete = document.createTextNode("\u00D7");
	span_delete.className = "close";
	span_delete.appendChild(txt_delete);new_cell_action.append(span_delete)
	var span_edit = document.createElement("SPAN");
	var txt_edit = document.createTextNode("\u270E");
	span_edit.className = "edit";
	span_edit.appendChild(txt_edit);new_cell_action.append(span_edit)
}

var sort_data = (obj) => {
	var datasortName = todolistMul//[...todolistMul]
	var type = obj.id

	var spinner = document.querySelector('.loader');
	spinner.classList.add('spin');
	spinner.style.display = "block"

	if (type == "sort-name") {
		datasortName.sort((a, b) => {
			const nameA = a.name.toUpperCase()
			const nameB = b.name.toUpperCase()
			if (nameA < nameB) return sort_type["type"] == type && (sort_type["count"] % 2 != 0) ? 1 : -1
			if (nameA > nameB) return sort_type["type"] == type && (sort_type["count"] % 2 != 0) ? -1 : 1
			return 0
		})
	} else if (type == "sort-color") {
		datasortName.sort((a, b) => {
			const nameA = a.color.toUpperCase()
			const nameB = b.color.toUpperCase()
			if (nameA < nameB) return sort_type["type"] == type && (sort_type["count"] % 2 != 0) ? 1 : -1
			if (nameA > nameB) return sort_type["type"] == type && (sort_type["count"] % 2 != 0) ? -1 : 1
			return 0
		})
	}

	sort_type["type"] = type
	sort_type["count"] ++

	showItems(todolistMul)
	changePage(current_page)

	setTimeout(() => {
		spinner.classList.remove('spin');
		spinner.style.display = "none"
	}, 1000)
	
}

const updateElement = () => {
	if (!checkValidateMultiUpd()) return 
	let index = (document.getElementById("id-upd").value)
	todolistMul[(current_page - 1) * records_per_page + parseInt(index)]["name"] = document.forms["update-element"]["name"].value
	todolistMul[(current_page - 1) * records_per_page + parseInt(index)]["color"] = document.forms["update-element"]["color"].value
	showItems(todolistMul)
	changePage(current_page)
	modal.style.display = "none";
}

var current_page = 1;
var records_per_page = 3;
function prevPage()
{
    if (current_page > 1) {
        current_page--;
        changePage(current_page);
    }
}

function nextPage()
{
    if (current_page < numPages()) {
        current_page++;
        changePage(current_page);
    }
}

function changePage(page)
{
    var btn_next = document.getElementById("btn_next");
    var btn_prev = document.getElementById("btn_prev");
    var page_span = document.getElementById("page");

    // Validate page
    if (page < 1) page = 1;
    if (page > numPages()) page = numPages();

    const tbody = document.getElementById("my-table").getElementsByTagName("tbody")[0]
	tbody.innerHTML = ''

    // for (var i = (page-1) * records_per_page; i < (page * records_per_page) && i < todolistMul.length; i++) {
    //     createLiComponent(tbody, todolistMul[i].name, todolistMul[i].color)
    // }

	showItems(todolistMul.slice((page-1) * records_per_page, (page * records_per_page)))
    page_span.innerHTML = page;

    if (page == 1) {
        btn_prev.style.visibility = "hidden";
    } else {
        btn_prev.style.visibility = "visible";
    }

    if (page == numPages()) {
        btn_next.style.visibility = "hidden";
    } else {
        btn_next.style.visibility = "visible";
    }
}

function numPages()
{
    return Math.ceil(todolistMul.length / records_per_page);
}

const url = "./data.json";
const fetchJSON = async() => {
	try {
		const data = await fetch(url)
		const res = await data.json()
		todolistMul = [...res]
	} catch(err) {
		console.log(err)
	}
}
(async() => {
	await fetchJSON()
	showItems(todolistMul)
	changePage(1)
})()
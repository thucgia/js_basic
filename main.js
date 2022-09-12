var todolist = []
var close = document.getElementsByClassName("close");
var edit = document.getElementsByClassName("edit");
var listShow = () => {
	var show_data_test = todolist
	const ul = document.getElementById("myUL")
	ul.innerHTML = ''

	show_data_test.map(item => {
		ul.append(createLiComponent(item))
		document.getElementById("myInput").value = "";

		for (let i = 0; i < close.length; i++) {
			close[i].onclick = function() {
				todolist.splice(i, 1)
				listShow()
			}
		}
	
		for (let i = 0; i < edit.length; i++) {
			edit[i].onclick = function() {
				var listItem=this.parentElement;
	
				var editInput=listItem.querySelector('input[type=text]');
				var label=listItem.querySelector("label");
				var containsClass=listItem.classList.contains("editMode");
					//If class of the parent is .editmode
					if(containsClass){
						todolist[i] = editInput.value
						listShow()
					}else{
						editInput.value=label.innerText;
					}
	
					//toggle .editmode on the parent.
					listItem.classList.toggle("editMode");
			}
		}
	})
}

var newElement = () => {
	const value = document.getElementById("myInput").value
	todolist.push(value)
	listShow()
}

// --------------------- object -------------
var todolistMul = []
var newElementMulti = () => {
	const value = {}
	value.name = document.getElementById("myInputName").value
	value.color = document.getElementById("myInputColor").value
	todolistMul.push(value)
	listShowMulti()
}

var listShowMulti = () => {
	var show_data_multi = todolistMul
	const ul = document.getElementById("myUL-multi")
	ul.innerHTML = ''
	
	var items_close = ul.getElementsByClassName('close')
	var items_edit = ul.getElementsByClassName('edit')
	show_data_multi.map(item => {
		ul.append(createLiComponent(item.name, true, item.color))
		document.getElementById("myInputName").value = "";
		document.getElementById("myInputColor").value = "";

		for (let i = 0; i < items_close.length; i++) {
			close[i].onclick = function() {
				todolistMul.splice(i, 1)
				listShowMulti()
			}
		}

		for (let i = 0; i < items_edit.length; i++) {
			items_edit[i].onclick = function() {
				var listItem=this.parentElement;
	
				var editInput=listItem.getElementsByTagName('input');
				var label=listItem.getElementsByTagName("label");
				var containsClass=listItem.classList.contains("editMode-multi");
					//If class of the parent is .editmode
					if(containsClass){
						todolistMul[i]["name"] = editInput[0].value
						todolistMul[i]["color"] = editInput[1].value
						listShowMulti()
					}else{
						editInput[0].value=label[0].innerText;
						editInput[1].value=label[1].innerText;
					}
	
					//toggle .editmode on the parent.
					listItem.classList.toggle("editMode-multi");
			}
		}
	})
}

var createLiComponent = (value, multi = false, value_2 = "") => {
	let li = document.createElement("li")
	var span_delete = document.createElement("SPAN");
	var txt_delete = document.createTextNode("\u00D7");

	var span_edit = document.createElement("SPAN");
	var txt_edit = document.createTextNode("\u270E");

	

	if (multi) {
		var label = document.createElement("LABEL")
		var input_edit = document.createElement("INPUT")
		input_edit.type = "text"
		input_edit.className="multi"

		var label_2 = document.createElement("LABEL")
		var input_edit_2 = document.createElement("INPUT")
		input_edit_2.type = "text"
		input_edit_2.className="multi"
	} else {
		var label = document.createElement("LABEL")
		var input_edit = document.createElement("INPUT")
		input_edit.type = "text"
	}

	span_delete.className = "close";
	span_delete.appendChild(txt_delete);

	span_edit.className = "edit";
	span_edit.appendChild(txt_edit);
	
	label.innerText = value
	li.appendChild(label);
	li.appendChild(input_edit);
	if (multi) {
		var span_div = document.createElement("B")
		span_div.innerText = " - "
		label_2.innerText = value_2
		li.appendChild(span_div);
		li.appendChild(label_2);
		li.appendChild(input_edit_2);
	}
	li.appendChild(span_delete);
	li.appendChild(span_edit);
	return li
}

var sort_data = (obj) => {
	var datasortName = todolistMul//[...todolistMul]
	var type = obj.id

	if (type == "sort-name") {
		datasortName.sort((a, b) => {
			const nameA = a.name.toUpperCase()
			const nameB = b.name.toUpperCase()
			if (nameA < nameB) return -1
			if (nameA > nameB) return 1
			return 0
		})
	} else if (type == "sort-color") {
		datasortName.sort((a, b) => {
			const nameA = a.color.toUpperCase()
			const nameB = b.color.toUpperCase()
			if (nameA < nameB) return -1
			if (nameA > nameB) return 1
			return 0
		})
	}

	listShowMulti()
}
/*
 Step 1: After the page is loaded, dynamically generate a table (shopping list) based on local data.
 Get the node object to be operated on
 
 Step 2: After the shopping cart list is dynamically generated, all the checkeBox label node objects in the tbody are obtained, and when the selected one is selected, the corresponding row subtotal is obtained for the total price calculation.
 		third step:
 Add an onchange event for each checkbox and change the total price based on the action
 Step 4: Select all
 		the fifth step:
 Add a mouse click event to the plus or minus button
 Change the quantity of this item
 Step 6: Delete
 Get all delete buttons
 Add a mouse click event to the delete button
 Delete current line and update local data
 */

var listObj = getAllData();
var table = document.getElementById("table")
var box = document.getElementById("box")
var tbody = document.getElementById("tbody");
var totalPrice = document.getElementById("totalPrice");
var allCheck = document.getElementById("allCheck");

if(listObj.length == 0) { //cart is null
	box.className = "box";
	table.className = "hide";
} else {
	box.className = "box hide";
	table.className = "";
	for(var i = 0, len = listObj.length; i < len; i++) {
		var tr = document.createElement("tr");
		tr.setAttribute("pid", listObj[i].pid);
			 
		tr.innerHTML = '<td>' +
			'<input type="checkbox" class="ck"  />' +
			'</td>' +
			'<td>' +
			'<img src="' + listObj[i].pImg + '" alt="" />' +
			'</td>' +
			 '<td>' +
			'<span>' + listObj[i].pSize + '</span>' +
			'</td>' +
			'<td>' +
			'<button class="down">-</button><input type="text" value="' + listObj[i].pCount + '" readonly="readonly" /><button class="up">+</button>' +
			'</td>' +
			'<td>' +
			'￥<span>' + listObj[i].price + '</span>' +
			'</td>' +
			'<td>' +
			'￥<span>' + listObj[i].price * listObj[i].pCount + '</span>' +
			'</td>' ;
		tbody.appendChild(tr);
	}
}

/*
 	total price
 */
var cks = document.querySelectorAll("tbody .ck");
function getTotalPrice() {
	cks = document.querySelectorAll("tbody .ck");
	var sum = 0;
	for(var i = 0, len = cks.length; i < len; i++) {
		if(cks[i].checked) {  
			var tr = cks[i].parentNode.parentNode;
			var temp = tr.children[5].firstElementChild.innerHTML;
			sum = Number(temp) + sum;
		}
	}
	return sum;
}
/*add onchange event*/
for(var i = 0, len = cks.length; i < len; i++) {
	cks[i].onchange = function() {
		checkAllChecked();
		totalPrice.innerHTML = getTotalPrice();
	}
}

/*all select*/
allCheck.onchange = function() {
	if(this.checked) {
		for(var i = 0, len = cks.length; i < len; i++) {
			cks[i].checked = true;
		}
	} else {
		for(var i = 0, len = cks.length; i < len; i++) {
			cks[i].checked = false;
		}
	}
	totalPrice.innerHTML = getTotalPrice();
}

var downs = document.querySelectorAll(".down");  
var ups = document.querySelectorAll(".up"); 
  
for(var i = 0, len = downs.length; i < len; i++) {
	downs[i].onclick = function() {
		var txtObj = this.nextElementSibling; 
		var tr = this.parentNode.parentNode;
		var pid = tr.getAttribute("pid");
		txtObj.value = txtObj.value - 1;
		if(txtObj.value < 1) {
			txtObj.value = 1;
			updateObjById(pid, 0)
		} else {
			updateObjById(pid, -1)
		}
		tr.children[0].firstElementChild.checked = true;
		checkAllChecked();
		var price = tr.children[4].firstElementChild.innerHTML;
		tr.children[5].firstElementChild.innerHTML = price * txtObj.value;
		totalPrice.innerHTML = getTotalPrice();

	}

	ups[i].onclick = function() {
		var txtObj = this.previousElementSibling; 
		var tr = this.parentNode.parentNode;
		var pid = tr.getAttribute("pid");
		txtObj.value = Number(txtObj.value) + 1;
		updateObjById(pid, 1)
		tr.children[0].firstElementChild.checked = true;
		checkAllChecked()
		var price = tr.children[4].firstElementChild.innerHTML;
		tr.children[5].firstElementChild.innerHTML = price * txtObj.value;
		totalPrice.innerHTML = getTotalPrice();
	}

	 
}

/*Check if you want to select all*/
function checkAllChecked() {
	var isSelected = true;  
	for(var j = 0, len = cks.length; j < len; j++) {
		if(cks[j].checked == false) {
			isSelected = false;
			break;
		}
	}
	allCheck.checked = isSelected;
}
/*
 	1 : get the node object to be operated
    2: After the page is loaded, you need to calculate how many [...] items are stored in the local cookie, and assign the number to ccount.
    3: Bind a click event onclick for each item corresponding to the shopping cart button
 Change local cookie
 Get the pid of the current item
 Loop through the local cookie-converted array, take the pid of each object for comparison, if it is equal, the item is not added for the first time.
 Take the item from the shopping cart and add 1 to the pCount value.
 Otherwise: create a new object and save it to the shopping. At the same time, the number of the goods is 1
 */

var ccount = document.getElementById("ccount"); //total number of products
var btns = document.querySelectorAll(".list dl dd button");  

var choosebox = document.getElementById("choosebox");
var as = choosebox.getElementsByTagName("a");
var inputs = choosebox.getElementsByTagName("input");
  
for (var i = 0; i < as.length; i++) {
     
     as[i].index_a = i;
     as[i].onclick = function () {
     	for (var i = 0; i < as.length; i++) {
            as[i].className = "";
            inputs[i].className="";
     	}
     	this.className = "current";
        
        inputs[this.index_a].className="current";
     }
}
 
//Use the cookie named datas to store the data in the shopping cart

var listStr = cookieObj.get("datas");
/*Determine if there is a shopping cart in the local area*/
if(!listStr) { 
	cookieObj.set({
		name: "datas",
		value: "[]"
	});
	listStr = cookieObj.get("datas");
}

var listObj = JSON.parse(listStr); // Loop through the array to get the sum of the pCount values ​​in each object
var totalCount = 0;  
for(var i = 0, len = listObj.length; i < len; i++) {
	totalCount = listObj[i].pCount + totalCount;
}
ccount.innerHTML = totalCount;

/*add event for button*/
 
btns[0].onclick = function() {
		var Size =document.getElementsByName("Size");
        var pSize=null;    
        for(var i=0;i<Size.length;i++){ 
	        if(Size[i].className=="current") { 
		    pSize =Size[i].value;
		    break;
	        }
        }

		var dl = this.parentNode.parentNode;
		if(pSize=="M"){
           var pid = dl.getAttribute("pid");
		}else if(pSize=="X"){
           var pid = "1002";
		}else if(pSize=="XL"){
           var pid = "1003"; 
		}
		
		var arrs = dl.children; 
		if(checkObjByPid(pid)) {
			listObj = updateObjById(pid, 1)
		} else {
			var imgSrc = arrs[0].firstElementChild.src;
			
			var pName = arrs[1].innerHTML;
		    var price = arrs[2].firstElementChild.innerHTML;
			
			var obj = {
				pid: pid,
				pImg: imgSrc,
				price: price,
				pName: pName,			 				
				pSize:pSize,
				pCount: 1
			};
			listObj.push(obj)
			listObj = updateData(listObj);
		}
		ccount.innerHTML = getTotalCount();
	}
 
/*
 	according to the id,check if the specified data (item) is included in the local data
    id：product
 */
function checkObjByPid(id) {
	var jsonStr = cookieObj.get("datas");
	var jsonObj = JSON.parse(jsonStr);
	var isExist = false;
	for(var i = 0, len = jsonObj.length; i < len; i++) {
		if(jsonObj[i].pid == id) {
			isExist = true;
			break;
		}
	}
	return isExist; //return false;
}

/*
 	update local data
 	arr: array
 	return the latest local converted array object
 * */
function updateData(arr) {
	var jsonStr = JSON.stringify(arr);
	cookieObj.set({
		name: "datas",
		value: jsonStr
	});
	jsonStr = cookieObj.get("datas");
	return JSON.parse(jsonStr);
}

/*
 	get the total number of products
 	return: number
 */
function getTotalCount() {
	/*Loop through the array to get the sum of the pCount values ​​in each object*/
	var totalCount = 0;  
	var jsonStr = cookieObj.get("datas");
	var listObj = JSON.parse(jsonStr);
	for(var i = 0, len = listObj.length; i < len; i++) {
		totalCount = listObj[i].pCount + totalCount;
	}
	return totalCount;
}

/*
 	according to the pid,update the local data 
 	id:product
 */
function updateObjById(id, num) {
	var jsonStr = cookieObj.get("datas");
	var listObj = JSON.parse(jsonStr);
	for(var i = 0, len = listObj.length; i < len; i++) {
		if(listObj[i].pid == id) {
			listObj[i].pCount = listObj[i].pCount + num;
			break;
		}
	}
	return updateData(listObj)
}

/*
 	get local data
 	return array
 * */
function getAllData() {
	var jsonStr = cookieObj.get("datas");
	var listObj = JSON.parse(jsonStr);
	return listObj;
}

function deleteObjByPid(id) {
	var lisObj = getAllData();
	for(var i = 0, len = lisObj.length; i < len; i++) {
		if(lisObj[i].pid == id) {
			lisObj.splice(i, 1);
			break;
		}
	}
	updateData(lisObj);
	return lisObj;
}
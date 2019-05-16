 
var cookieObj = {
	/*
		Add or modify cookies
        Parameters: o object {}
        Name:string cookie name
        Value:string cookie value
        Expires: Date object expiration time
        Path:string path limit
        Domain:string domain name restriction
        Secure:boolean true https false or undeinfed
	*/
	set: function(o) {
		var cookieStr = encodeURIComponent(o.name) + "=" + encodeURIComponent(o.value);
		if(o.expires) {
			cookieStr += ";expires=" + o.expires;
		}
		if(o.path) {
			cookieStr += ";path=" + o.path;
		}
		if(o.domain) {
			cookieStr += ";domain=" + o.domain;
		}
		if(o.secure) {
			cookieStr += ";secure";
		}

		document.cookie = cookieStr;
	},
	/*
		delete
		n: cookie name
	*/
	del: function(n) {
		var date = new Date();
		date.setHours(-1);
		 
		this.set({
			name: n,
			expires: date
		});
	},
	/*select*/
	get: function(n) {
		n = encodeURIComponent(n);
		var cooikeTotal = document.cookie;
		var cookies = cooikeTotal.split("; ");
		for(var i = 0, len = cookies.length; i < len; i++) {
			var arr = cookies[i].split("=");
			if(n == arr[0]) {
				return decodeURIComponent(arr[1]);
			}
		}
	}
}
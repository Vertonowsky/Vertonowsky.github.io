function setCookie(name, value, days) {
	let expires = "";
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
		expires = "; expires=" + date.toUTCString();
	}
	document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
	const nameEQ = name + "=";
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
	}
	return null;
}

document.addEventListener('DOMContentLoaded', function() {
	if (!getCookie('cookieAccepted'))
		document.getElementById('cookiePopup').classList.add("active");
	
	document.getElementById('acceptCookie').addEventListener('click', function() {
		setCookie('cookieAccepted', 'true', 365);
		document.getElementById('cookiePopup').classList.remove("active");
	});
});
const popup = document.getElementById('popup_info');
let delay   = 0;
let text    = "";
let timer;

function showPopup(text1) {
	delay  = 5;
	text   = text1;
	
	popup.classList.add("active");
	clearTimeout(timer);
	
	close(); // close popup after 5 seconds
}

function close() {
	delay--;
	
	if (delay < 0) {
		clearTimeout(timer);
		timer = null;
		return;
	}
	
	if (delay === 0)
		popup.classList.remove("active");
	
	timer = setTimeout("close()", 1000);
}

const closePopup = document.getElementById("popup_close");
closePopup.onclick = function() {
	delay = 0;
	popup.classList.remove("active");
}
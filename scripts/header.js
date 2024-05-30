const header = document.getElementById("header");

window.onscroll = function () {
	if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40)
		header.classList.add("active");
	else
		header.classList.remove("active");
};

window.onload = function () {
	if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40)
		header.classList.add("active");
	else
		header.classList.remove("active");
};
function SimplePopUpOpen() {
    var popup = document.getElementById('js-popup');
    if(!popup) return;
    popup.classList.add('is-show');

    var blackBg = document.getElementById('js-black-bg');
    blackBg.addEventListener('click', function() {
		popup.classList.remove('is-show');
	});
}

function SimplePopUpClose() {
    var popup = document.getElementById('js-popup');
    popup.classList.remove('is-show');
}

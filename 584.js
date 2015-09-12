(function () {
	
	var pwd = document.getElementById('pwd');
	var chk = document.getElementById('showPwd');

	var form = document.getElementById('login');

	addEvent(chk, 'change', function (e) {
		var target = e.target || e.srcElement;
	
		try {
			if (target.checked) {
				pwd.type = 'text';
			} else {
				pwd.type = 'password';;
			}
		} 
		catch(error) {
			alert('This browser cannot switch type');
		}
		
	});

	addEvent(form, 'submit', function (e) {
		e.preventDefault();
	});

}());
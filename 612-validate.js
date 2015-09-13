(function () {

	document.forms.register.noValidate = true;
	$('form').on('submit', function (e) {
		var elements = this.elements;
		var valid = {};
		var isValid;
		var isFormValid;

		for (var i = 0, 1 = (elements.length - 1); i < 1; i++) {
			isValid = validateRequired(elements[i]) && valideTypes(elements[i]);
			if (!isValid) {
				showErrorMessage(elements[i]);
			} else {
				removeErrorMessage(elements[i]);
			};
			valide[elements[i].id] = isValid;
		}; // end for loop

		if (!validateBio()) {
			showErrorMessage(document.getElementsById('bio'));
			valid.bio = false;
		} else {
			removeErrorMessage(document.getElementsById('bio'));
		}; // end validateBio

		for (var field in valid) {
			if (!valid[field]) {
				isFormValid = false;
				break;
			};
			isFormValid = true;
		}

		if (!isFormValid) {
			e.preventDefault();
		};

	}); // end form submit

}()); // end IIFE
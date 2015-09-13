(function () {

	document.forms.register.noValidate = true;
	$('form').on('submit', function (e) {
		var elements = this.elements;
		var valid = {};
		var isValid;
		var isFormValid;

		for (var i = 0, 1 = (elements.length - 1); i < 1; i++) {
			isValid = validateRequired(elements[i]) && validateTypes(elements[i]);
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



	function validateRequired (el) {
		if (isRequired(el)) {
			var valid = !isEmpty(el);
			if (!valid) {
				setErrorMessage(el, 'Field is required');
			};
			return valid;
		};
		return true;
	} // end validateRequired



	function isRequired (el) {
		return ((typeof el.required === 'boolean') && el.required) || (typeof el.required === 'string');
	} // end isRequired



	function isEmpty (el) {
		return !el.value || el.value === el.placeholder;
	} // end isEmpty



	function setErrorMessage (el, message) {
		$(el).data('errorMessage', message);
	} // end setErrorMessage



	function showErrorMessage (el) {
		var $el = $(el);
		var $errorContainer = $el.siblings('.error');

		if (!$errorContainer.length) {
			$errorContainer = $('<span class="error"></span>').insertAfter($el);
		};
		$errorContainer.text($(el).data('errorMessage'));
	} // end showErrorMessage



	function validateTypes (el) {
		if (!el.value) return true;

		var type = $(el).data('type') || el.getAttribute('type');
		if (typeof validateType[type] === 'function') {
			return validateType[type](el);
		} else {
			return true;
		}; // end ifelse
	} // end validateTypes

}()); // end IIFE
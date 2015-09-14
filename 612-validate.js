(function () {

	document.forms.register.noValidate = true;
	$('form').on('submit', function (e) {
		var elements = this.elements;
		var valid = {};
		var isValid;
		var isFormValid;

		var i;
		for (i = 0, l = elements.length; i < l; i++) {
			isValid = validateRequired(elements[i]) && validateTypes(elements[i]);
			if (!isValid) {
				showErrorMessage(elements[i]);
			} else {
				removeErrorMessage(elements[i]);
			};
			valid[elements[i].id] = isValid;
		}; // end for loop

		if (!validateBio()) {
			showErrorMessage(document.getElementById('bio'));
			valid.bio = false;
		} else {
			removeErrorMessage(document.getElementById('bio'));
		}; // end validateBio

		if (!validatePassword()) {
			showErrorMessage(document.getElementById('password'));
			valid.password = false;
		} else {
			removeErrorMessage(document.getElementById('password'));
		}; // end validatePassword

		if (!validateParentsConsent()) {
			showErrorMessage(document.getElementById('parents-consent'));
			valid.parentsConsent = false;
		} else {
			removeErrorMessage(document.getElementById('parents-consent'));
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



	function validateTypes (el) {
		if (!el.value) return true;

		var type = $(el).data('type') || el.getAttribute('type');
		if (typeof validateType[type] === 'function') {
			return validateType[type](el);
		} else {
			return true;
		}; // end ifelse
	} // end validateTypes



	function validateParentsConsent () {
		var parentsConsent = document.getElementById('parents-consent');
		var consentContainer = document.getElementById('consent-container');
		var valid = true;
		if (consentContainer.className.indexOf('hide') === -1) {
			valid = parentsConsent.checked;
			if (!valid) {
				setErrorMessage(parentsConsent, 'You need your parents\' consent');
			}; // end !valid if
		}; // end indexOf 'hide' if
		return valid;
	} // end validateParentsConsent



	function validateBio () {
		var bio = document.getElementById('bio');
		var valid = bio.value.length <= 140;
		if (!valid) {
			setErrorMessage(bio, 'Please make sure your bio does not exceed 140 characters');
		}; // end !valid if
		return valid;
	} // end validateBio



	function validatePassword () {
		var password = document.getElementById('password');
		var valid = password.value.length >= 8;
		if (!valid) {
			setErrorMessage(password, 'Please make sure your password has at least 8 characters');
		}; // end !valid if
		return valid;
	} // end validatePassword



	function setErrorMessage (el, message) {
		$(el).data('errorMessage', message);
	} // end setErrorMessage



	function getErrorMessage (el) {
		return $(el).data('errorMessage') || el.title;
	} // end getErrorMessage



	function showErrorMessage (el) {
		var $el = $(el);
		var errorContainer = $el.siblings('.error');

		if (!errorContainer.length) {
			errorContainer = $('<span class="error"></span>').insertAfter($el);
		};
		errorContainer.text(getErrorMessage(el));
	} // end showErrorMessage



	function removeErrorMessage (el) {
		var errorContainer = $(el).siblings('.error.message');
		errorContainer.remove();
	} // end removeErrorMessage



	var validateType = {
		email: function (el) {
			var valid = /[^@]+@[^@]+/.test(el.value);
			if (!valid) {
				setErrorMessage(el, 'Please enter a valid email');
			} // end !valid if
			return valid;
		},
		number: function (el) {
			var valid = /^\d+$/.test(el.value);
			if (!valid) {
				setErrorMessage(el, 'Please enter a valid number');
			}; // end !valid if
			return valid;
		},
		date: function (el) {
			var valid = /^(\d{2}\/\d{2}\/\d{4})|(\d{4}-\d{2}-\d{2})$/.test(el.value);
			if (!valid) {
				setErrorMessage(el, 'Please enter a valid date');
			}; // end !valid if
			return valid;
		},

	}; // end validateType object

	

}()); // end IIFE
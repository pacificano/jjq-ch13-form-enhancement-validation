(function() {

	if ('placeholder' in document.createElement('input')) {
		return;
	} // end placeholder if

	var length = document.forms.length;

	for (var i = 0, l = length; i < l; i++ ) {
		showPlaceholder(document.forms[i].elements);
	} // end length for loop



	function showPlaceholder(elements) {

		for (var i = 0, l = elements.length; i < l; i++) {
			
			var el = elements[i];

			if (!el.placeholder) {
				continue;
			} // end !el.placeholder if

			el.style.color = '#666666';
			el.value = el.placeholder;

			addEvent(el, 'focus', function () {
				if (this.value === this.placeholder) {
					this.value = '';
					this.style.color = '#000000';
				}
			}); // end addEvent 'focus'

			addEvent(el, 'blur', function () {
				if (this.value === '') {
					this.value = this.placeholder;
					this.style.color = '#666666';
				}
			}); // end addEvent 'blur'

		} //end for loop

	} // end showPlaceholder loop

}()); // end IIFE
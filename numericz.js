/**
 * Created by solution on 15.9.13.
 */

$.fn.numbericz = function () {

	var ctrlHitted = false;

	var floatedFill = false;

	var shiftHitted = false;

	var shiftedNums = [48, 49, 50, 51, 52, 53, 54, 55, 56, 57];

	function controlFloation(currentValue) {
		var controlPattern = new RegExp('[.,]', 'g');
		return !(controlPattern.test(currentValue));
	};

	this.keydown(function (event) {
		var keyCode = event.keyCode;

		if (keyCode == 16) shiftHitted = true;

		if ((shiftHitted && (keyCode >= 48 && keyCode <= 57))) {
			return;
		}

		if ((ctrlHitted && (keyCode == 65 || keyCode == 88))
			|| (keyCode >= 37 && keyCode <= 40)
			|| (keyCode >= 96 && keyCode <= 105)
			|| (keyCode >= 35 && keyCode <= 36)
			|| (keyCode == 8 || keyCode == 46)) {
			ctrlHitted = false;

		} else if (keyCode == 188 || keyCode == 190 || keyCode == 110) {
			if (shiftHitted) {
				event.preventDefault();
				return;
			}
			if (floatedFill)
				event.preventDefault();

			floatedFill = true;

		} else if (keyCode == 17) {

			ctrlHitted = true;

		} else {
			event.preventDefault();
		}
	});

	this.keyup(function(event){
		var keyCode = event.keyCode;

		if (keyCode == 16) {
			shiftHitted = false;
		} else if (keyCode == 8 || keyCode == 46) {
			if (controlFloation($(this).val())) floatedFill = false;
		} else if (keyCode >= 48 && keyCode <= 57) {
			var currentValue = $(this).val().toString();
			$(this).val(currentValue + shiftedNums.indexOf(keyCode));
		}
	});

	this.on('paste', function (event) {
		event.preventDefault();
	});
};
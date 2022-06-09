(function ($) {


	/**
	 *  initialize_field
	 *
	 *  This function will initialize the $field.
	 *
	 *  @date    30/11/17
	 *  @since    5.6.5
	 *
	 *  @param    n/a
	 *  @return    n/a
	 */

	function initialize_field($field) {

		//$field.doStuff();
		$inputFrom = $field.find('.wsr-date-range-from');
		$inputTo = $field.find('.wsr-date-range-to');
		$fieldToSave = $field.find('.field-to-save');

		from = $inputFrom.datepicker({
			changeMonth: true,
			dateFormat: "dd/mm/yy",
			numberOfMonths: 1
		}).on("change", function () {
			to.datepicker("option", "minDate", this.value);
		});

		to = $inputTo.datepicker({
			changeMonth: true,
			dateFormat: "dd/mm/yy",
			numberOfMonths: 1
		}).on("change", function () {
			from.datepicker("option", "maxDate", this.value);
		});

		from.datepicker("option", "maxDate", to.datepicker('getDate'));
		to.datepicker("option", "minDate", from.datepicker('getDate'));

		$inputFrom.change(function () {
			addDatesToHiddenField($field);
		});

		$inputTo.change(function () {
			addDatesToHiddenField($field);
		});

		function addDatesToHiddenField($field) {
			$inputFrom = $field.find('.wsr-date-range-from');
			$inputTo = $field.find('.wsr-date-range-to');
			$fieldToSave = $field.find('.field-to-save');

			$from = $inputFrom.val();
			$to = $inputTo.val();
			if ((!$from) && (!$to)) {
				$fieldToSave.val("");
			} else {
				$fieldToSave.val($from + '--' + $to);
			}
		}
	}


	if (typeof acf.add_action !== 'undefined') {

		/*
        *  ready & append (ACF5)
        *
        *  These two events are called when a field element is ready for initizliation.
        *  - ready: on page load similar to $(document).ready()
        *  - append: on new DOM elements appended via repeater field or other AJAX calls
        *
        *  @param	n/a
        *  @return	n/a
        */

		acf.add_action('ready_field/type=date_range_picker', initialize_field);
		acf.add_action('append_field/type=date_range_picker', initialize_field);


	} else {

		/*
        *  acf/setup_fields (ACF4)
        *
        *  These single event is called when a field element is ready for initizliation.
        *
        *  @param	event		an event object. This can be ignored
        *  @param	element		An element which contains the new HTML
        *  @return	n/a
        */

		$(document).on('acf/setup_fields', function (e, postbox) {

			// find all relevant fields
			$(postbox).find('.field[data-field_type="date_range_picker"]').each(function () {

				// initialize
				initialize_field($(this));

			});

		});

	}

})(jQuery);

$('<style>').prop('type', 'text/css')
            .html('.vsc { margin-left: 3em; } .result-number { position: absolute; float: left; font-weight: bold; font-size: 2em; width: 1.5em; height: 2em; } ')
	    .appendTo('head');

var serpIndex = 1;
$('#ires li.g div.vsc').each(function(index, result) {
	result = $(result);

	var onmousedown = $(result).find('> h3.r a').attr('onmousedown');
	if (onmousedown && onmousedown.match(/return rwt/)) {
		result.before('<div class="result-number">' + serpIndex + '</div>');
		serpIndex++;
	}
});

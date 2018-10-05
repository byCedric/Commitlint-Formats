'use strict';

module.exports = function junit(report = {}) {
	let output = '';

	output += '<?xml version="1.0" encoding="utf-8"?>\n';
	output += '<testsuites>\n';

	if (report.valid === false) {
		output += `<testsuite name="commitlint" failures="${report.errorCount}" tests="${report.errorCount}">\n`;

		report.results.forEach((result) => {
			const name = result.input.split('\n')[0];
			const errorCount = result.errors.length;

			output += `<testsuite name="${name}" failures="${errorCount}" tests="${errorCount}">\n`;

			result.errors.forEach((error) => {
				const type = error.level === 2 ? 'error' : 'warning';

				output += `<testcase name="${error.name}">\n`;
				output += `<failure type="${type}">`;
				output += `${error.message} (${error.name})\n`
				output += `\n${result.input}`;
				output += '</failure>\n';
				output += '</testcase>\n';
			});

			output += '</testsuite>\n';
		});

		output += '</testsuite>\n';
	}

	output += '</testsuites>\n';

    return output;
}

// @flow
import { type Report } from '@commitlint/format';

/**
 * Indent the message with an indentation level.
 * This will add tabs based on this level.
 *
 * @param  {number} level
 * @param  {string} line
 * @return {string}
 */
function indent(level: number, line: string): string {
	return `${'  '.repeat(level)}${line}`;
}

/**
 * Format the commitlint report as a valid JUnit XML report.
 *
 * @param  {Object} report
 * @return {string}
 */
function formatJunit(report?: Report): string {
	let output = '';

	output += indent(0, '<?xml version="1.0" encoding="utf-8"?>\n');
	output += indent(0, '<testsuites>\n');

	if (report && report.valid === false) {
		const { errorCount } = report;

		output += indent(1, `<testsuite name="commitlint" failures="${errorCount}" tests="${errorCount}">\n`);

		report.results.forEach(result => {
			const name = result.input.split('\n')[0];
			const errorCount = result.errors.length;

			output += indent(2, `<testsuite name="${name}" failures="${errorCount}" tests="${errorCount}">\n`);

			result.errors.forEach(error => {
				const type = error.level === 2 ? 'error' : 'warning';

				output += indent(3, `<testcase name="${error.name}">\n`);
				output += indent(4, `<failure type="${type}">`);
				output += `${error.message} (${error.name})\n`;
				output += `\n${result.input}`;
				output += '</failure>\n';
				output += indent(3, '</testcase>\n');
			});

			output += indent(2, '</testsuite>\n');
		});

		output += indent(1, '</testsuite>\n');
	}

	output += indent(0, '</testsuites>\n');

	return output;
}

module.exports = formatJunit;

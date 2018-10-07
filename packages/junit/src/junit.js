// @flow
import { type Report } from '@commitlint/format';

type CreateElementOptions = {
	noNewline?: boolean,
	indent?: number,
};

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
 * Create a new XML element containing various properties.
 * It can be configured to automatically add a newline, indentation and make it self closing.
 *
 * @param  {string} tag
 * @param  {CreateElementOptions} options
 * @param  {Object} attributes
 * @return {string}
 */
function createElement(tag: string, options: CreateElementOptions, attributes: any): string {
	const element = `<${tag}`;
	const ending = options.noNewline ? '' : '\n';
	const properties = Object.keys(attributes)
		.map(key => `${key}="${attributes[key]}"`)
		.join(' ');

	return indent(options.indent || 0, `${element} ${properties}>${ending}`);
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

	if (report) {
		output += createElement('testsuite', { indent: 1 }, {
			name: 'commitlint',
			failures: report.errorCount + report.warningCount,
			tests: report.results.reduce(
				(carry, result) => carry + ((result.errors.length + result.warnings.length) || 1),
				0
			),
		});

		report.results.forEach(result => {
			const issues = [].concat(result.errors, result.warnings);

			output += createElement('testsuite', { indent: 2 }, {
				name: result.input.split('\n')[0],
				failures: issues.length,
				tests: issues.length || 1,
			});

			if (issues.length > 0) {
				issues.forEach(issue => {
					const type = issue.level === 2 ? 'error' : 'warning';

					output += indent(3, `<testcase name="${issue.name}">\n`);
					output += indent(4, `<failure type="${type}">`);
					output += `${issue.message} (${issue.name})\n`;
					output += `\n${result.input}`;
					output += '</failure>\n';
					output += indent(3, '</testcase>\n');
				});

				output += indent(2, '</testsuite>\n');
			} else {
				output += indent(3, '<testcase name="valid" />\n');
				output += indent(2, '</testsuite>\n');
			}
		});

		output += indent(1, '</testsuite>\n');
	}

	output += indent(0, '</testsuites>\n');

	return output;
}

module.exports = formatJunit;

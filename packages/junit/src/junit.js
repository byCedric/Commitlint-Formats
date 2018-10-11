// @flow
import { type Report } from '@commitlint/format';

type CreateElementOptions = {
	noNewline?: boolean,
	indent?: number,
	closes?: boolean,
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
 * Escape a string to make it xml safe.
 *
 * @param  {string} text
 * @return {string}
 */
function escape(text: string | number): string {
	const characters = {
		'<': '&lt;',
		'>': '&gt;',
		'&': '&amp;',
		'\'': '&apos;',
		'"': '&quot;',
	};

	return String(text).replace(/[<>&'"]/g, char => characters[char]);
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
	const closing = options.closes ? ' />' : '>';
	const ending = options.noNewline ? '' : '\n';
	const properties = Object.keys(attributes)
		.map(key => `${key}="${escape(attributes[key])}"`)
		.join(' ');

	return indent(options.indent || 0, `${element} ${properties}${closing}${ending}`);
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
			errors: 0,
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
				errors: 0,
				failures: issues.length,
				tests: issues.length || 1,
			});

			if (issues.length > 0) {
				issues.forEach(issue => {
					const type = issue.level === 2 ? 'error' : 'warning';

					output += createElement('testcase', { indent: 3 }, { name: issue.name });
					output += createElement('failure', { indent: 4, noNewline: true }, { type });
					output += '<![CDATA[';
					output += `${issue.message} (${issue.name})\n`;
					output += `\n${result.input}`;
					output += ']]>';
					output += '</failure>\n';
					output += indent(3, '</testcase>\n');
				});

				output += indent(2, '</testsuite>\n');
			} else {
				output += createElement('testcase', { indent: 3, closes: true }, { name: 'valid' });
				output += indent(2, '</testsuite>\n');
			}
		});

		output += indent(1, '</testsuite>\n');
	}

	output += indent(0, '</testsuites>\n');

	return output;
}

module.exports = formatJunit;

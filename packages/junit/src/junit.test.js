// @flow
import test from 'ava';
import format from './junit';

const report = {
	valid: false,
	errorCount: 1,
	warningCount: 1,
	results: [
		{
			valid: false,
			input: 'foo: bar\n\nMy detailed explanation about something.\n\nCloses #123',
			errors: [
				{
					valid: false,
					level: 2,
					name: 'type-enum',
					message: 'type must be one of [feat,fix,test]',
				},
			],
			warnings: [
				{
					valid: true,
					level: 1,
					name: 'subject-min-length',
					message: 'subject must not be shorter than 15 characters',
				},
			],
		},
		{
			valid: true,
			input: 'fix: junit including succesful tests',
			errors: [],
			warnings: [],
		},
	],
};

test('returns string without report', t => {
	t.is('string', typeof format());
});

test('contains testsuite summary', t => {
	t.true(format(report).includes('testsuite name="commitlint" errors="0" failures="2" tests="3"'));
});

test('contains testsuite summary without any tests', t => {
	const output = format({
		valid: true,
		errorCount: 0,
		warningCount: 0,
		results: [],
	});

	t.true(output.includes('testsuite name="commitlint" errors="0" failures="0" tests="0"'));
});

test('contains testsuite summary with only valid tests', t => {
	const output = format({
		valid: true,
		errorCount: 0,
		warningCount: 0,
		results: [
			{
				valid: true,
				input: 'fix: junit including succesful tests',
				errors: [],
				warnings: [],
			},
			{
				valid: true,
				input: 'feat: add commitlint junit report formats',
				errors: [],
				warnings: [],
			},
		],
	});

	t.true(output.includes('testsuite name="commitlint" errors="0" failures="0" tests="2"'));
});

test('contains testsuite with only commit header', t => {
	t.true(format(report).includes('testsuite name="foo: bar" errors="0" failures="2" tests="2"'));
});

test('contains testcase elements with rule name', t => {
	const output = format(report);

	t.true(output.includes('testcase name="type-enum"'));
	t.true(output.includes('testcase name="subject-min-length"'));
});

test('contains failure elements with issue level', t => {
	const output = format(report);

	t.true(output.includes('failure type="error"'));
	t.true(output.includes('failure type="warning"'));
});

test('contains rule issue explanation', t => {
	const output = format(report);
	const { input } = report.results[0];

	t.true(output.includes(`type must be one of [feat,fix,test] (type-enum)\n\n${input}`));
	t.true(output.includes(`subject must not be shorter than 15 characters (subject-min-length)\n\n${input}`));
});

test('contains self-closing valid test cases', t => {
	t.true(format(report).includes('<testcase name="valid" />'));
});

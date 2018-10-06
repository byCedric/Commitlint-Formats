// @flow
import test from 'ava';
import format from './junit';

const exampleReport = {
	valid: false,
	errorCount: 0,
	warningCount: 2,
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
				{
					valid: true,
					level: 1,
					name: 'subject-min-length',
					message: 'subject must not be shorter than 15 characters',
				},
			],
		},
	],
};

test('returns string without report', t => {
	t.is('string', typeof format());
});

test('output contains testsuite with summary', t => {
	const output = format(exampleReport);

	t.true(output.includes('testsuite name="commitlint"'));
	t.true(output.includes(`failures="${exampleReport.errorCount}"`));
	t.true(output.includes(`tests="${exampleReport.errorCount}"`));
});

test('output contains testsuite with commit header', t => {
	const output = format(exampleReport);
	const errors = exampleReport.results[0].errors.length;

	t.true(output.includes('testsuite name="foo: bar"'));
	t.true(output.includes(`failures="${errors}"`));
	t.true(output.includes(`tests="${errors}"`));
});

test('output contains testcase elements with rule name', t => {
	const output = format(exampleReport);

	t.true(output.includes('testcase name="type-enum"'));
	t.true(output.includes('testcase name="subject-min-length"'));
});

test('output contains failure elements with issue level', t => {
	const output = format(exampleReport);

	t.true(output.includes('failure type="error"'));
	t.true(output.includes('failure type="warning"'));
});

test('output contains rule issue explanation', t => {
	const output = format(exampleReport);
	const commit = exampleReport.results[0].input;

	t.true(output.includes(`type must be one of [feat,fix,test] (type-enum)\n\n${commit}`));
	t.true(output.includes(`subject must not be shorter than 15 characters (subject-min-length)\n\n${commit}`));
});

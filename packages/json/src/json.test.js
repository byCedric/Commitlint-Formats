// @flow
import test from 'ava';
import format from './json';

const exampleReport = {
	valid: false,
	errorCount: 1,
	warningCount: 0,
	results: [
		{
			valid: false,
			input: 'foo: bar',
			errors: [
				{
					valid: false,
					level: 2,
					name: 'type-enum',
					message: 'type must be one of [feat,fix,test]',
				},
			],
		},
	],
};

test('returns string without report', t => {
	t.is('string', typeof format());
});

test('matches json-stringified report', t => {
	t.is(JSON.stringify(exampleReport), format(exampleReport));
});

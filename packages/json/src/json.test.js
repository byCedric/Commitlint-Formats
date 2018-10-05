import test from 'ava';
import format from './json';

test('format returns string', t => {
	t.is('string', typeof format())
})

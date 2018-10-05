import test from 'ava';
import formatter from './junit';

test('formatter returns string', t => {
	t.is('string', typeof formatter());
})

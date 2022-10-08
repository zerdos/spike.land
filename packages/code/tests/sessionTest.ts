import {test} from 'uvu';
import * as assert from 'uvu/assert';

import {applyPatch, hashCode, makePatch, startSession} from '../js/session';

const state1 = {code: 'export default () => <h1>Hello</h1>', transpiled: '//1ff420c5', i: 33, css: '', html: '<h1 id="1c86ccc0"></h1>'};
const state2 = {code:  'export default () => <h1>World</h1>', transpiled: '//1ff420c5', i: 33, css: '', html: '<h1 id="1c86ccc0"></h1>'};
const state3 = {code: 'export default () => <h1>World</h1>', transpiled: '//1ff420c5', i: 34, css: '', html: '<h1 id="1c86ccc0"></h1>'};

let hash1 = 0;
let hash2;

test('At start hashCode is 0', () => {
	assert.is(hashCode(), 0);
});

test('Then we can start it', () => {
	startSession('z', {name: 'z', state: state1}, '');
	hash1 = hashCode();
	assert.is(Number(hashCode()), hash1);
});

test('It remembers', () => {
	//     StartSession("z",{name: "z", state1} );

	//     const state2 = {code:"yoo", transpiled: "", i:33, css: "", html:""};
	//     makePatch(state2);
	assert.is(hashCode(), hash1);
	// //    assert.is(hashCode(),0);
});

test('wont start a new session', () => {
	const hash1 = hashCode();

	startSession('z', {name: 'z', state: state2}, '');

	assert.is(Number(hashCode()), hash1);
});

test('do nothing if code change without the i', async () => {
	const p = await makePatch(state2);
	assert.is(hashCode(), hash1);
	assert.is(p.oldHash, hash1);

	hash2 = p.newHash;
let errMessage = ""
	try{
	await applyPatch(p);
	} catch(err) {
		if (err instanceof Error) errMessage = err.message;
	}

	assert.equal(errMessage, "Code update without I update error");

	assert.not.equal(hashCode(), p.newHash);
});


test('applies a patch', async () => {
	const p = await makePatch(state3);
	assert.is(hashCode(), hash1);
	assert.is(p.oldHash, hash1);

	hash2 = p.newHash;

	await applyPatch(p);

	assert.is(hashCode(), p.newHash);
});


test.run();

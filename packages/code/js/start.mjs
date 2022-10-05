import {run} from './starter';
import StarterApp from '/live/code-main/js';

fetch('/live/code-main/session').then(resp => resp.json())
	.then(session => run(session, StarterApp));

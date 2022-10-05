import {createEditSession, edit} from 'ace-builds';

import 'ace-builds/src-noconflict/theme-monokai';

import 'ace-builds/src-noconflict/mode-typescript';

export async function startAce(code: string) {
	// Const {ace} = window;
	const editor = edit('editor');
	editor.setTheme('ace/theme/monokai');
	editor.session.setMode('ace/mode/typescript', () => ({jsx: true}));
	const mode = editor.session.getMode();
	const js = createEditSession(code, mode);
	editor.setSession(js);

	return editor;
}

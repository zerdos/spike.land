import { edit} from 'ace-builds';
import 'ace-builds/src-min-noconflict/theme-monokai';
import 'ace-builds/src-min-noconflict/mode-typescript';


export async function startAce(code: string) {
	// Const {ace} = window;
	const editor = edit('editor', {    
		autoScrollEditorIntoView: true,
		useWorker: true,
		scrollPastEnd:true,
		copyWithEmptySelection: true,});
	editor.setTheme('ace/theme/monokai');
	
	editor.session.setMode('ace/mode/typescript', () => ({jsx: true}));
	editor.session.setValue(code);

	return editor;
}

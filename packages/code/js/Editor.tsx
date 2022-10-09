import {useEffect, useRef, useState} from 'react';
// Import type FC from "react"
import {css} from '@emotion/react';
import { prettierJs } from 'prettierEsm';
import {mST, onSessionUpdate} from './session';
import {isMobile} from './isMobile.mjs';

const mod = {
	CH() {},
	code: '',
	codeToSet: ''
};

// Export type IStandaloneCodeEditor = editor.Ist;

export const Editor: React.FC<
{
	code: string;
	i: number;
	codeSpace: string;
	assets: Record<string, string>;
}
> = (
	{code, i, codeSpace, assets},
) => {
	const ref = useRef<HTMLDivElement>(null) as undefined | {
		current: HTMLDivElement;
	};

	// Const mst = mST();
	const [
		mySession,
		changeContent,
	] = useState({
		myCode: code,
		counter: i,
		started: false,
		async runner(
			{code, counter, codeSpace}: {
				code: string;
				counter: number;
				codeSpace: string;
			},
		) {
			// If (!mySession.x/) return;
			const {runner} = await import('./runner');

			runner({code: prettierJs(code), counter, codeSpace});
			changeContent((x: typeof mySession) => ({
				...x,
				runner,
				code,
				counter,
			}));
		},
		myId: 'loading',
		getValue: () => '' as string,
		setValue(_code: string) {},
		onChange(_cb: () => void) {},
		engine: isMobile() ? 'ace' : 'monaco',
	});

	mod.CH = () => changeContent;

	const {
		counter,
		myCode,
		started,

		myId,
		runner,
		engine,
		getValue,
		setValue,
		onChange,
	} = mySession;

	mod.code = myCode;

	useEffect(() => {
		if (!ref?.current) {
			return;
		}

		const setMonaco = async () => {
			const link = document.createElement('link');
			link.setAttribute('rel', 'stylesheet');
			link.href = location.origin + '/' + assets['ws.css'];
			document.head.append(link);

			const {startMonaco} = await import('./startMonaco');

			const {model, getTypeScriptWorker, setValue} = await startMonaco(
				/**
         * @param {any} code
         */
				{
					container: ref.current,
					name: codeSpace,
					code: mST().code,
				},
			);

			const getValue =()=> {
				try {
					(async () => {
						const tsWorker = await (await getTypeScriptWorker())(
							model.uri,
						);

						const diag = await tsWorker.getSemanticDiagnostics(
							location.origin + '/live/' + codeSpace + '.tsx',
						);
						console.log({diag});
					})();
				} catch {
					console.error('ts diag error');
				}

				return prettierJs(model.getValue());
			}

			changeContent(x => ({
				...x,
				started: true,
				setValue: (code: string)=>{
					if (code===getValue()) return;
						setTimeout(()=> mod.codeToSet === code &&  setValue(code), 500);
					setValue(code);

				},
				getValue,
				onChange: (cb: () => void) => model.onDidChangeContent(cb).dispose,
				myId: 'editor',
				// Model: editor.getModel(),
			}));

			// Object.assign(session, { monaco, editor, model });

			// let inc = 0;
		};

		const setAce = async () => {
			const {startAce} = await import('./startAce');
			const editor = await startAce(mST().code);
			const getValue = ()=>prettierJs(editor.session.getValue());

			changeContent(x => ({
				...x,
				onChange(cb: () => void) {
					editor.session.on('change', cb);
					return () => {
						editor.session.off('change', cb);
					};
				},
				started: true,
				getValue,
				setValue(code: string) {
					mod.codeToSet = code;
					if (code === getValue()) return;
				setTimeout(()=> mod.codeToSet === code &&  editor.session.setValue(code), 500);
				},
				myId: 'editor',
			}));
		};

		const loadEditors = async () => {

			(engine === 'monaco' ? await setMonaco() : await setAce());

			// Console.log("RUN THE RUNNER");
		
			//runner({code, counter, codeSpace});
		};

		!started && loadEditors();
	}, [started, ref]);

	// UseInsertionEffect(()=>{

	// })

	useEffect(() => {
		if (!started) {
			return;
		}

		const lastCode = mod.code;
		let last = 0;
		const handler = setInterval(() => {
			const now = Date.now();
			if (now - last < 5000) {
				return;
			}

			last = now;
			if (getValue() !== lastCode) {
				const code = getValue();
				if (code === mST().code || code === mod.code) {
					return;
				}

				changeContent(x => ({...x, myCode: code, i: i + 1}));
				runner({code, counter, codeSpace});
			}
		}, 5000);

	
		return () => {
			clearInterval(handler);
		};
	}, [changeContent, counter, myCode]);

	useEffect(() => {
		
		onChange(cb);


	
	}, [onChange]);


	useEffect(() => {
		if (!started) return;
		setValue(myCode);

		runner({code: myCode, counter: counter, codeSpace});
	
	}, [setValue, myCode, counter, codeSpace, started]);


	


	// useEffect(() => {
	// 	if (!started) {
	// 		return;
	// 	}

	// 	if (i > counter) {
	// 		changeContent(x => ({...x, myCode: code, counter: i}));
	// 		return;
	// 	}

	// }, [setValue, getValue, counter, prettierJs, runner]);

	
	onSessionUpdate(() => {if (counter<mST().i) 
		changeContent(
			x=>
			({...x, counter: mST().i,
				 myCode: mST().code}));  
		setValue(mST().code)
	}, "editor");
	return (
		<div
			data-test-id={myId}
			id='editor'
			css={css`
        
            max-width: 640px;
            height: 100%;
            
            
        `}
			ref={ref}
		/>
	);

	function cb() {
		const code = getValue();
		const newCode = prettierJs(code);

		if (newCode === mod.code) {
			return;
		}

		if (newCode === mST().code) {
			return;
		}
		// If (i === mST().i) return;

		try {
			// Console.log("change content");

			changeContent(x => ({
				...x,
				counter: mST().i + 1,
				myCode: newCode,
			}));
		

			// Console.log("RUN THE RUNNER AGAIN");
		} catch (error) {
			console.error({err: error});
			console.error('restore editor');

			// Model?.setValue(code);
		}
	};
};

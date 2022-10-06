import {useEffect, useRef, useState} from 'react';
// Import type FC from "react"
import {css} from '@emotion/react';
import {wait} from 'wait';
import {mST, onSessionUpdate} from './session';
import {isMobile} from './isMobile.mjs';

const mod = {
	CH() {},
	code: '',
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
		prettierJs: (code: string) => code,
		async runner(
			{code, counter, codeSpace}: {
				code: string;
				counter: number;
				codeSpace: string;
			},
		) {
			// If (!mySession.x/) return;
			const {runner} = await import('./runner');
			const {prettierJs} = await import('./prettierJs');

			runner({code: prettierJs(code), counter, codeSpace});
			changeContent((x: typeof mySession) => ({
				...x,
				runner,
				code,
				counter,
				prettierJs,
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
		prettierJs,
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

			changeContent(x => ({
				...x,
				started: true,
				setValue,
				getValue() {
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

					return model.getValue();
				},
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
			changeContent(x => ({
				...x,
				onChange(cb: () => void) {
					editor.session.on('change', cb);
					return () => {
						editor.session.off('change', cb);
					};
				},
				started: true,
				getValue: () => editor.session.getValue(),
				setValue(code: string) {
					editor.session.setValue(code);
				},
				myId: 'editor',
			}));
		};

		const loadEditors = async () => {

			(engine === 'monaco' ? await setMonaco() : await setAce());

			// Console.log("RUN THE RUNNER");
		
			//runner({code, counter, codeSpace});
		};

		loadEditors();
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

		onSessionUpdate(() => {
			const sess = mST();
	
			setTimeout(() => {
				
				if (mST().i <= counter) {
					return;
				}
	
				if (mST().i > sess.i) {
					return;
				}
	
				console.log('sessUP');
				// Console.log(`session ${sess.i} mst: ${mST().i}, our i: ${counter}`);
				setValue(sess.code);
	
				if (mod.CH() as unknown as typeof changeContent !== changeContent) {
					const ch = mod.CH() as unknown as typeof changeContent;
					ch(x => ({
						...x,
						myCode: sess.code,
						counter: sess.i,
					}));
				}
	
				changeContent(x => ({
					...x,
					myCode: sess.code,
					counter: sess.i,
				}));
			}, 300);
		}, 'editor');
		return () => {
			clearInterval(handler);
		};
	}, [changeContent, i, runner, prettierJs]);

	useEffect(() => {
		
		onChange(cb);


	
	}, [onChange]);


	useEffect(() => {
		if (!started) return;

		runner({code: myCode, counter: counter, codeSpace});
	
	}, [myCode, counter, codeSpace, started]);


	


	useEffect(() => {
		if (!started) {
			return;
		}

		if (i > counter) {
			changeContent(x => ({...x, myCode: code, counter: i}));
			return;
		}

	}, [setValue, getValue, counter, prettierJs, runner]);

	

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

import {useEffect, useRef, useState, useCallback} from'react';
// Import type FC from "react"
import {css} from '@emotion/react';
import { prettierJs } from 'prettierEsm';
import {mST, onSessionUpdate} from './session';
import {isMobile} from './isMobile.mjs';

const mod = {
	CH() {},
	code: '',
	lastKeyDown: 0,
	codeToSet: ''
};

// Export type IStandaloneCodeEditor = editor.Ist;

export const Editor: React.FC<
{
	codeSpace: string;
	assets: Record<string, string>;
}>
= (
	{codeSpace, assets}
) => {
	const ref = useRef<HTMLDivElement>(null) as undefined | {
		current: HTMLDivElement;
	};

	const {i, code} = mST();

	const [
		mySession,
		changeContent,
	] = useState({
		lastKeyDown: 0,
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

	const {
		counter,
		myCode,
		started,
		myId,
		// runner,
		engine,
		// getValue,
		setValue,
		onChange,
	} = mySession;

	mod.code = myCode;

	const cb = useCallback(()=> { 
		
		const lastKeydownHappened = Date.now()- mod.lastKeyDown;
		console.log({lastKeydownHappened});
		let increment = 0
		if (lastKeydownHappened>1000) {
increment=1;
			//console.log(`last keydown happened:   + ${lastKeydownHappened}, we already handled this event`);
//		return;
		}
		const code = mySession.getValue();
		const newCode = prettierJs(code);

		if (newCode === myCode) {
			return;
		}

		if (newCode === mST().code) {
			return;
		}

		// if (mySession.counter  mST().i) return;



			changeContent(x => ({
				...x,
				lastKeyDown: 0,
				counter: mST().i + increment,
				myCode: newCode,
			}));
		

			// Console.log("RUN THE RUNNER AGAIN");

		

			// Model?.setValue(code);
		}, [mod.lastKeyDown, myCode, counter, changeContent]);

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
					if (code.length< `export default ()=><></>`.length) return;
					if (code===getValue()) return;
					mod.codeToSet = code;

		

					setTimeout(()=> mod.codeToSet === code && setValue(code), 800);  //wait this time before overwriting the value					 
					

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
					if (code.length< `export default ()=><></>`.length) return;
					if (code===getValue()) return;
		  		mod.codeToSet = code;
				setTimeout(()=> mod.codeToSet === code &&  editor.session.setValue(code), 800);
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
		



		onChange(cb);


	
	}, [onChange]);


	// useEffect(() => {
	// 	if (!started) return;
	// 	setValue(myCode);
	
	// 	const lastKeydownHappened = (Date.now()-lastKeyDown;

	// 	if (lastKeydownHappened>2000) {

	// 		console.log('last keydown happened: '  + $lastKeydownHappened );
			
	// 	}
	// 	runner({code: myCode, counter: counter, codeSpace}){
	// 	};
	
	// }, [setValue, myCode, counter, codeSpace, started]);


	


	// useEffect(() => {
	// 	if (!started) {
	// 		return;
	// 	}

	// 	if (i > counter) {
	// 		changeContent(x => ({...x, myCode: code, counter: i}));
	// 		return;
	// 	}

	// }, [setValue, getValue, counter, prettierJs, runner]);

	
	onSessionUpdate(() => {
		if (counter<mST().i) {changeContent(
			x=>
			({...x, counter: mST().i,
				 myCode: mST().code}));  
			}
				 setValue(mST().code);
			
		},
		
		'editor');

	return (
		<div
			onKeyDown={()=>mod.lastKeyDown= Date.now()}
			data-test-id={myId}
			id='editor'
			css={css`
        
            max-width: 640px;
            height: 100%;
            
            
        `}
			ref={ref}
		/>
	);

	
};

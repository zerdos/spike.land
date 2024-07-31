

// react-app.js
const App = () => {
    const [count, setCount] = React.useState(0);
    const [inputValue, setInputValue] = React.useState('');
    const inputRef = React.useRef(null);

    React.useEffect(() => {
        let lastFocusedElementId = null;
        let lastSelectionStart = null;
        let lastSelectionEnd = null;

        const sendContent = () => {
            const content = document.getElementById('root').innerHTML;
            window.parent.postMessage({ from: 'react', html: content }, '*');
        };

        sendContent();

        window.addEventListener('message', (event) => {
            if (event.data.from === 'proxy') {
                const targetElement = document.querySelector(`${event.data.target.tagName.toLowerCase()}[id="${event.data.target.id}"]`);
                if (targetElement) {
                    if (event.data.type === 'click') {
                        targetElement.click();
                    } else if (event.data.type === 'input' || event.data.type === 'focus') {
                        setInputValue(event.data.target.value);
                        lastFocusedElementId = event.data.target.id;
                        lastSelectionStart = event.data.target.selectionStart;
                        lastSelectionEnd = event.data.target.selectionEnd;
                    }
                }
                setTimeout(() => {
                    sendContent();
                    // Restore focus and selection after content update
                    if (lastFocusedElementId) {
                        const elementToFocus = document.getElementById(lastFocusedElementId);
                        if (elementToFocus) {
                            elementToFocus.focus();
                            if (elementToFocus.setSelectionRange && 
                                typeof lastSelectionStart === 'number' && 
                                typeof lastSelectionEnd === 'number') {
                                elementToFocus.setSelectionRange(lastSelectionStart, lastSelectionEnd);
                            }
                        }
                    }
                }, 0);
            }
        });
    }, []);

    return (
        <div>
            <h2>React App Iframe</h2>
            <p>This is the React app iframe. It processes events from the proxy iframe.</p>
            <button id="incrementButton" onClick={() => setCount(count + 1)}>
                Click me: {count}
            </button>
            <input 
                id="testInput" 
                ref={inputRef}
                type="text" 
                placeholder="Type here" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
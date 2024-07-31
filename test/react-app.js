
// react-app.js
const App = () => {
    const [count, setCount] = React.useState(0);
    const [lastEvent, setLastEvent] = React.useState(null);

    React.useEffect(() => {
        const sendContent = () => {
            const content = document.getElementById('root').innerHTML;
            window.parent.postMessage({ from: 'react', html: content }, '*');
        };

        // Send initial content
        sendContent();

        // Setup event listener
        window.addEventListener('message', (event) => {
            if (event.data.from === 'proxy') {
                setLastEvent(event.data);

                // Apply the event to the React app
                const targetElement = document.querySelector(`${event.data.target.tagName.toLowerCase()}[id="${event.data.target.id}"]`);
                if (targetElement) {
                    if (event.data.type === 'click') {
                        targetElement.click();
                    } else if (event.data.type === 'input') {
                        targetElement.value = event.data.target.value;
                        targetElement.dispatchEvent(new Event('input', { bubbles: true }));
                    }
                }

                // Send updated content back to proxy
                setTimeout(sendContent, 0);
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
            <input id="testInput" type="text" placeholder="Type here" />
            {lastEvent && (
                <div>
                    <h3>Last Received Event:</h3>
                    <pre>{JSON.stringify(lastEvent, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));

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
                // Here you would process the event and determine what HTML changes to send back
                sendContent();
            }
        });
    }, []);

    return (
        <div>
            <h2>React App Iframe</h2>
            <p>This is the React app iframe. It processes events from the proxy iframe.</p>
            <button onClick={() => setCount(count + 1)}>
                Click me: {count}
            </button>
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
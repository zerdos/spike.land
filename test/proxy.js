document.addEventListener('DOMContentLoaded', () => {
    const captureEvent = (event) => {
        const serializedEvent = {
            type: event.type,
            target: event.target.tagName,
            timestamp: Date.now(),
            from: 'proxy'
        };
        window.parent.postMessage(serializedEvent, '*');
    };

    document.body.addEventListener('click', captureEvent);
    document.body.addEventListener('input', captureEvent);

    window.addEventListener('message', (event) => {
        if (event.data.from === 'react') {
            document.getElementById('content').innerHTML = event.data.html;
        }
    });
});
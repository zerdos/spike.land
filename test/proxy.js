document.addEventListener('DOMContentLoaded', () => {
    const captureEvent = (event) => {
        // Ignore events on the document body to prevent infinite loops
        if (event.target === document.body) return;

        const serializedEvent = {
            type: event.type,
            target: {
                tagName: event.target.tagName,
                id: event.target.id,
                className: event.target.className,
                textContent: event.target.textContent,
            },
            timestamp: Date.now(),
            from: 'proxy'
        };
        window.parent.postMessage(serializedEvent, '*');
    };

    document.body.addEventListener('click', captureEvent, true);
    document.body.addEventListener('input', captureEvent, true);

    window.addEventListener('message', (event) => {
        if (event.data.from === 'react') {
            document.getElementById('content').innerHTML = event.data.html;
        }
    });
});
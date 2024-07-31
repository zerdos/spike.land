// proxy.js
document.addEventListener('DOMContentLoaded', () => {
    let lastFocusedElement = null;

    const captureEvent = (event) => {
        if (event.target === document.body) return;

        // Update lastFocusedElement when an element gains focus
        if (event.type === 'focus') {
            lastFocusedElement = event.target;
        }

        const serializedEvent = {
            type: event.type,
            target: {
                tagName: event.target.tagName,
                id: event.target.id,
                className: event.target.className,
                textContent: event.target.textContent,
                value: event.target.value,
                selectionStart: event.target.selectionStart,
                selectionEnd: event.target.selectionEnd
            },
            timestamp: Date.now(),
            from: 'proxy'
        };
        window.parent.postMessage(serializedEvent, '*');
    };

    document.body.addEventListener('click', captureEvent, true);
    document.body.addEventListener('input', captureEvent, true);
    document.body.addEventListener('focus', captureEvent, true);

    window.addEventListener('message', (event) => {
        if (event.data.from === 'react') {
            document.getElementById('content').innerHTML = event.data.html;
            // Restore focus after content update
            if (lastFocusedElement) {
                const elementToFocus = document.getElementById(lastFocusedElement.id);
                if (elementToFocus) {
                    elementToFocus.focus();
                    if (elementToFocus.setSelectionRange && 
                        typeof lastFocusedElement.selectionStart === 'number' && 
                        typeof lastFocusedElement.selectionEnd === 'number') {
                        elementToFocus.setSelectionRange(lastFocusedElement.selectionStart, lastFocusedElement.selectionEnd);
                    }
                }
            }
        }
    });
});

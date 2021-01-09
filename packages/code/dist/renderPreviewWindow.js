// deno-lint-ignore-file
//@ts-nocheck
export function renderPreviewWindow(mode, session, open, renderEmotion, jsx, DraggableWindow) {
    const onShare = async () => {
        const { shareItAsHtml } = await import("./share.js");
        const link = await shareItAsHtml({
            code: session.code,
            transpiled: session.transpiled,
            html: session.html,
        });
        console.log({ link });
        open(link);
    };
    let preview = window.document.getElementById("preview");
    if (!preview) {
        const element = window.document.createElement("div");
        window.document.body.appendChild(element);
        preview = element;
    }
    renderEmotion(jsx(DraggableWindow, {
        onShare,
        position: mode === "windoow" ? "fixed" : "absolute",
    }), preview);
    const zbody = window.document.getElementById("zbody");
    if (zbody !== null) {
        zbody.appendChild(session.div);
    }
    if (session.html) {
        session.div.innerHTML = session.html;
    }
}

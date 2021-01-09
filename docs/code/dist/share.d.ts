export function shareItAsHtml({ transpiled, code, html, versions }: {
    code: string;
    html: string;
    transpiled: string;
    versions: any;
}): Promise<string>;

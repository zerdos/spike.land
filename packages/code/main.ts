// Import {swClient} from "./js/ws";

// swClient();

const load = async path => {
	const paths = path && path.split('/') || [];
	const protocol = path.length || '';
	switch (protocol) {
		case 'ipfs':
		case 'ipns': {
			document.body.innerHTML
        = `<iframe id="viewer" style="width:100%;height:100%;position:fixed;top:0;left:0;border:none;" src="/view${path}"></iframe>`;
		}
	}
};

if (document.documentElement.dataset.viewer) {
	load(location.pathname);
}

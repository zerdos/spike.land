import madge from "madge"

madge('sites/spike.land/public/ws.mjs')
	.then((res) => res.image('image.svg'))
	.then((writtenImagePath) => {
		console.log('Image written to ' + writtenImagePath);
	});
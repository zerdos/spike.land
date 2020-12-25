fetch("https://ipfs.io/ipfs/QmNSW14V6QUWdVGTCehjcB3a6j3F7dRyxy4cTrTb7japmi")
.then(data=>data.text())
.then(async (text) => {

    

 
  const App = (await import(URL.createObjectURL(
      new Blob([text], { type: "application/javascript" }
      ))
    )).default;

    const {renderEmotion} = await import("https://unpkg.com/@zedvision/emotion-react-renderer@10.13.3/dist/bundle.js")
 
    

    renderEmotion(App(), document.getElementById("zbody"));


});

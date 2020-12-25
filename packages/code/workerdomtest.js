fetch("https://ipfs.io/ipfs/QmXHjhVtnuGTVuY3v9DZV4hTwTvfpbYQZZNwNPMkw8EWQj")
.then(data=>data.text())
.then(async (text) => {

    

 
  const App = (await import(URL.createObjectURL(
      new Blob([text], { type: "application/javascript" }
      ))
    )).default;

    const {renderEmotion} = await import("https://unpkg.com/@zedvision/emotion-react-renderer@10.13.3/dist/bundle.js")
 
    

    renderEmotion(App(), document.getElementById("zbody"));


});



// import { renderEmotion } from "https://unpkg.com/@zedvision/emotion-react-renderer@10.13.3/dist/bundle.js"
// fetch("https://ipfs.io/ipfs/QmXHjhVtnuGTVuY3v9DZV4hTwTvfpbYQZZNwNPMkw8EWQj")
// .then(data=>data.text())
// .then(async (text) => {
//   const App = (
//     await import(URL.createObjectURL(
//       new Blob([text], { type: "application/javascript" }
//       ))
//     )).default;
//     renderEmotion(App(), document.body.children[0]);
// })
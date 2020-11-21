export const example = `<!DOCTYPE html>
<html>

<head>
  <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
  <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7.12.7/babel.min.js"></script>
  <title>Hello Example</title>
  <style>
    body {
      margin: auto;
      overflow-y: auto;
    }
  </style>
</head>

<body>
  <div id="output"></div>

  <script type="text/jsx">

    const Hello = ({name}) => {
      const [counter, setCounter] = React.useState(0);
     
      React.useEffect(()=>{
        const cl =setInterval(()=>setCounter(x=>x+1), 1000);
        
        return ()=>clearInterval(cl);
      },[]);

      return <>
        <h1>Hello {name}</h1>
        <p>{counter}</p>
      </>
    }
    ReactDOM.render(<Hello name="React"/>, document.getElementById("output"))

</script>
</body>
<html>


`;

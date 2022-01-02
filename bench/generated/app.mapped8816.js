  import { h, Component, render } from 'lib/preact.js?n=8816';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8816!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
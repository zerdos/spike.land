  import { h, Component, render } from 'lib/preact.js?n=7664';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7664!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
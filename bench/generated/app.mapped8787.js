  import { h, Component, render } from 'lib/preact.js?n=8787';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8787!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
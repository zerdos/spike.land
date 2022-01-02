  import { h, Component, render } from 'lib/preact.js?n=1843';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1843!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
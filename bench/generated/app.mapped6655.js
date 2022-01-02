  import { h, Component, render } from 'lib/preact.js?n=6655';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6655!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
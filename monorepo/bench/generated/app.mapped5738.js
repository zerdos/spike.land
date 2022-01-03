  import { h, Component, render } from 'lib/preact.js?n=5738';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5738!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
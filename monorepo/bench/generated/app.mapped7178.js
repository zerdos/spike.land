  import { h, Component, render } from 'lib/preact.js?n=7178';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7178!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
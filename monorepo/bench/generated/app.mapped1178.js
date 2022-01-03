  import { h, Component, render } from 'lib/preact.js?n=1178';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1178!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
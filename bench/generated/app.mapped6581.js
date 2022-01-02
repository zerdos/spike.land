  import { h, Component, render } from 'lib/preact.js?n=6581';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6581!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
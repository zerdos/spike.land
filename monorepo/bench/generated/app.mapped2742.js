  import { h, Component, render } from 'lib/preact.js?n=2742';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2742!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
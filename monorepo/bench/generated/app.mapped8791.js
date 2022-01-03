  import { h, Component, render } from 'lib/preact.js?n=8791';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8791!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
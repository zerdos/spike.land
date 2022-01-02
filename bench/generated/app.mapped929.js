  import { h, Component, render } from 'lib/preact.js?n=929';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 929!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
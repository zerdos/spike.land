  import { h, Component, render } from 'lib/preact.js?n=2625';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2625!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
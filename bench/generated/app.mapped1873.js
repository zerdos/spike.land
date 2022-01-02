  import { h, Component, render } from 'lib/preact.js?n=1873';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1873!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
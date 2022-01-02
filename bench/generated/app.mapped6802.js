  import { h, Component, render } from 'lib/preact.js?n=6802';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6802!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
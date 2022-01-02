  import { h, Component, render } from 'lib/preact.js?n=1824';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1824!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=1682';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1682!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
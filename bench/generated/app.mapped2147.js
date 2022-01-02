  import { h, Component, render } from 'lib/preact.js?n=2147';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2147!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=1766';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1766!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
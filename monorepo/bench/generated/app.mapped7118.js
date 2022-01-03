  import { h, Component, render } from 'lib/preact.js?n=7118';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7118!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=1679';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1679!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
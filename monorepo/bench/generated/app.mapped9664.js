  import { h, Component, render } from 'lib/preact.js?n=9664';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9664!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
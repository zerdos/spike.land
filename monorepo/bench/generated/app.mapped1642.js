  import { h, Component, render } from 'lib/preact.js?n=1642';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1642!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
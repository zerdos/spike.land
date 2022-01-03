  import { h, Component, render } from 'lib/preact.js?n=6642';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6642!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
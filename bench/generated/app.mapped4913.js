  import { h, Component, render } from 'lib/preact.js?n=4913';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4913!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
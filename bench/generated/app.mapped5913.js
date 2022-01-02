  import { h, Component, render } from 'lib/preact.js?n=5913';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5913!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=8673';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8673!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
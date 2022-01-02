  import { h, Component, render } from 'lib/preact.js?n=5354';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5354!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
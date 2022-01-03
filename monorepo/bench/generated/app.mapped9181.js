  import { h, Component, render } from 'lib/preact.js?n=9181';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9181!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
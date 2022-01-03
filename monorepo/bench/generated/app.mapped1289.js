  import { h, Component, render } from 'lib/preact.js?n=1289';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1289!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
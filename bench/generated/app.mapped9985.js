  import { h, Component, render } from 'lib/preact.js?n=9985';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9985!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
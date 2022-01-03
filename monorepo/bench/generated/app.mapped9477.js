  import { h, Component, render } from 'lib/preact.js?n=9477';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9477!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
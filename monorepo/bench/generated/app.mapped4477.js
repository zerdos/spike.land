  import { h, Component, render } from 'lib/preact.js?n=4477';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4477!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
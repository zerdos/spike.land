  import { h, Component, render } from './preact.js?n=8477';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8477!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
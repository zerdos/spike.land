  import { h, Component, render } from './preact.js?n=6479';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6479!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
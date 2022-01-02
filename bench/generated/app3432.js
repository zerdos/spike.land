  import { h, Component, render } from './preact.js?n=3432';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3432!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
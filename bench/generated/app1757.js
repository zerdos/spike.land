  import { h, Component, render } from './preact.js?n=1757';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1757!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
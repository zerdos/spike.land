  import { h, Component, render } from './preact.js?n=8353';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8353!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
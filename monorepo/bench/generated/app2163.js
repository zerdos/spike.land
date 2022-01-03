  import { h, Component, render } from './preact.js?n=2163';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2163!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
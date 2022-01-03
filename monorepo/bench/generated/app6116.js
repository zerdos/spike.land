  import { h, Component, render } from './preact.js?n=6116';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6116!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
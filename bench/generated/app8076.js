  import { h, Component, render } from './preact.js?n=8076';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8076!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
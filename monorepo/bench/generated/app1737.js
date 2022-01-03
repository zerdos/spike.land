  import { h, Component, render } from './preact.js?n=1737';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1737!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
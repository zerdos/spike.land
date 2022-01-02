  import { h, Component, render } from './preact.js?n=1693';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1693!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
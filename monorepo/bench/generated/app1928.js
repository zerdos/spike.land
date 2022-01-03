  import { h, Component, render } from './preact.js?n=1928';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1928!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
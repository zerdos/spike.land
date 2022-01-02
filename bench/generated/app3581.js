  import { h, Component, render } from './preact.js?n=3581';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3581!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
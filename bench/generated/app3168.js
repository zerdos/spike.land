  import { h, Component, render } from './preact.js?n=3168';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3168!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
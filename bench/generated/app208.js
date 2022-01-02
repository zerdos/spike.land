  import { h, Component, render } from './preact.js?n=208';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 208!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
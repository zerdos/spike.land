  import { h, Component, render } from './preact.js?n=1393';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1393!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
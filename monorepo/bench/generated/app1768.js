  import { h, Component, render } from './preact.js?n=1768';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1768!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
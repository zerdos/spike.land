  import { h, Component, render } from './preact.js?n=619';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 619!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
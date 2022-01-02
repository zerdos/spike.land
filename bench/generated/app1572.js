  import { h, Component, render } from './preact.js?n=1572';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1572!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
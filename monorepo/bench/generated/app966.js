  import { h, Component, render } from './preact.js?n=966';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 966!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
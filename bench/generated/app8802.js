  import { h, Component, render } from './preact.js?n=8802';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8802!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
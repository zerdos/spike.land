  import { h, Component, render } from './preact.js?n=5057';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5057!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
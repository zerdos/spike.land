  import { h, Component, render } from './preact.js?n=2929';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2929!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
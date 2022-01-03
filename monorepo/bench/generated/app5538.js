  import { h, Component, render } from './preact.js?n=5538';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5538!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
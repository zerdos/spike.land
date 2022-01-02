  import { h, Component, render } from './preact.js?n=7609';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7609!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
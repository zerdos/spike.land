  import { h, Component, render } from './preact.js?n=6733';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6733!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
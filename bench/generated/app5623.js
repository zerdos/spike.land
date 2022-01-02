  import { h, Component, render } from './preact.js?n=5623';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5623!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
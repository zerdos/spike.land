  import { h, Component, render } from 'lib/preact.js?n=4355';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4355!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
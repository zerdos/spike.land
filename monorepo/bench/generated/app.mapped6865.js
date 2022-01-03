  import { h, Component, render } from 'lib/preact.js?n=6865';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6865!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
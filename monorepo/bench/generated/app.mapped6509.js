  import { h, Component, render } from 'lib/preact.js?n=6509';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6509!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
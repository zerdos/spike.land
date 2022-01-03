  import { h, Component, render } from 'lib/preact.js?n=6188';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6188!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
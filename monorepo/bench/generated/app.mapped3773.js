  import { h, Component, render } from 'lib/preact.js?n=3773';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3773!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
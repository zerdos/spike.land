  import { h, Component, render } from 'lib/preact.js?n=1016';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1016!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
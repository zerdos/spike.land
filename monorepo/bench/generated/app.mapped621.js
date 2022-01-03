  import { h, Component, render } from 'lib/preact.js?n=621';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 621!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=2149';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2149!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
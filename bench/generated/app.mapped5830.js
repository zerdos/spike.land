  import { h, Component, render } from 'lib/preact.js?n=5830';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5830!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
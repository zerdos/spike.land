  import { h, Component, render } from 'lib/preact.js?n=8067';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8067!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
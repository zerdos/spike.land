  import { h, Component, render } from 'lib/preact.js?n=5222';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5222!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
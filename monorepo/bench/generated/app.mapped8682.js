  import { h, Component, render } from 'lib/preact.js?n=8682';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8682!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
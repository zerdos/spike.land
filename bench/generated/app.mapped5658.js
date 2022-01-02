  import { h, Component, render } from 'lib/preact.js?n=5658';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5658!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=3422';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3422!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
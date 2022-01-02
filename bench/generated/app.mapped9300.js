  import { h, Component, render } from 'lib/preact.js?n=9300';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9300!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=7300';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7300!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
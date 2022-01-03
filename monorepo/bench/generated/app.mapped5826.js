  import { h, Component, render } from 'lib/preact.js?n=5826';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5826!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
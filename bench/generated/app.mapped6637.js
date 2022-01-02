  import { h, Component, render } from 'lib/preact.js?n=6637';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6637!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
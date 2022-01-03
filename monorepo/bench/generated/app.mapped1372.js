  import { h, Component, render } from 'lib/preact.js?n=1372';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1372!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
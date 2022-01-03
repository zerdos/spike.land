  import { h, Component, render } from 'lib/preact.js?n=2372';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2372!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=6666';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6666!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
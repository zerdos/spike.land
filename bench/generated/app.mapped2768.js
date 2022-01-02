  import { h, Component, render } from 'lib/preact.js?n=2768';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2768!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=5768';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5768!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
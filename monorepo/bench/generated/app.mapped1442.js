  import { h, Component, render } from 'lib/preact.js?n=1442';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1442!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
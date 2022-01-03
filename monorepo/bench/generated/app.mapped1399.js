  import { h, Component, render } from 'lib/preact.js?n=1399';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1399!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
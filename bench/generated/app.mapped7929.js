  import { h, Component, render } from 'lib/preact.js?n=7929';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7929!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
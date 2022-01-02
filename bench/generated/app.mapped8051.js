  import { h, Component, render } from 'lib/preact.js?n=8051';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8051!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=2306';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2306!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
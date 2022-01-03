  import { h, Component, render } from 'lib/preact.js?n=1961';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1961!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
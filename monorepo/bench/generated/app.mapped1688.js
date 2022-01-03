  import { h, Component, render } from 'lib/preact.js?n=1688';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1688!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
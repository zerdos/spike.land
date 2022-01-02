  import { h, Component, render } from 'lib/preact.js?n=2641';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2641!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
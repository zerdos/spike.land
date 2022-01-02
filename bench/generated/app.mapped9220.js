  import { h, Component, render } from 'lib/preact.js?n=9220';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9220!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
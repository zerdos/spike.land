  import { h, Component, render } from 'lib/preact.js?n=1328';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1328!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
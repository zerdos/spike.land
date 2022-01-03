  import { h, Component, render } from 'lib/preact.js?n=1246';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1246!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=6020';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6020!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
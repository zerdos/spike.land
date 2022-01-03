  import { h, Component, render } from 'lib/preact.js?n=2831';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2831!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
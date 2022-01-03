  import { h, Component, render } from 'lib/preact.js?n=6145';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6145!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
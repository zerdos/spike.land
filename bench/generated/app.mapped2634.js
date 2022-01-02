  import { h, Component, render } from 'lib/preact.js?n=2634';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2634!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
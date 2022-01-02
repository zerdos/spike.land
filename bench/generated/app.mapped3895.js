  import { h, Component, render } from 'lib/preact.js?n=3895';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3895!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
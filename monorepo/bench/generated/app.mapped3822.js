  import { h, Component, render } from 'lib/preact.js?n=3822';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3822!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
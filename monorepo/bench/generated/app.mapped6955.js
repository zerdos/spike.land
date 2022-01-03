  import { h, Component, render } from 'lib/preact.js?n=6955';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6955!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=1654';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1654!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
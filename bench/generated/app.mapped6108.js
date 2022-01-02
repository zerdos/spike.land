  import { h, Component, render } from 'lib/preact.js?n=6108';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6108!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=1435';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1435!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
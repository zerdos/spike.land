  import { h, Component, render } from 'lib/preact.js?n=6743';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6743!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=5315';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5315!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=1531';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1531!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
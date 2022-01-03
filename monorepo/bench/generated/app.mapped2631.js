  import { h, Component, render } from 'lib/preact.js?n=2631';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2631!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
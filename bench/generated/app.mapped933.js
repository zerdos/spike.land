  import { h, Component, render } from 'lib/preact.js?n=933';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 933!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
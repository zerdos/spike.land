  import { h, Component, render } from 'lib/preact.js?n=2933';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2933!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=5892';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5892!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
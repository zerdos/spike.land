  import { h, Component, render } from 'lib/preact.js?n=6048';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6048!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
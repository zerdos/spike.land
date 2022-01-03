  import { h, Component, render } from 'lib/preact.js?n=1054';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1054!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
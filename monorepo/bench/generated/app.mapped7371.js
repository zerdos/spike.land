  import { h, Component, render } from 'lib/preact.js?n=7371';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7371!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
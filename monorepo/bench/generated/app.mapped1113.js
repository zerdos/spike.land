  import { h, Component, render } from 'lib/preact.js?n=1113';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1113!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
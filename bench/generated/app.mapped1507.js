  import { h, Component, render } from 'lib/preact.js?n=1507';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1507!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=6608';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6608!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
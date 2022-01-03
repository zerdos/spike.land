  import { h, Component, render } from 'lib/preact.js?n=3459';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3459!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=6487';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6487!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
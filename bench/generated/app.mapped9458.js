  import { h, Component, render } from 'lib/preact.js?n=9458';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9458!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
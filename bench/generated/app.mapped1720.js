  import { h, Component, render } from 'lib/preact.js?n=1720';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1720!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
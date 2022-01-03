  import { h, Component, render } from 'lib/preact.js?n=6809';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6809!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=7847';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7847!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
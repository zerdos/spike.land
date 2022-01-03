  import { h, Component, render } from 'lib/preact.js?n=885';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 885!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
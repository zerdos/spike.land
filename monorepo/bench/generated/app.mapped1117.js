  import { h, Component, render } from 'lib/preact.js?n=1117';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1117!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
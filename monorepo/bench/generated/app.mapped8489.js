  import { h, Component, render } from 'lib/preact.js?n=8489';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8489!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from 'lib/preact.js?n=5765';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5765!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
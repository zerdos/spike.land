  import { h, Component, render } from 'lib/preact.js?n=1154';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1154!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
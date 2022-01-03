  import { h, Component, render } from 'lib/preact.js?n=7714';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7714!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
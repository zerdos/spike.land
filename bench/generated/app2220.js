  import { h, Component, render } from './preact.js?n=2220';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2220!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
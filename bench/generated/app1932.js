  import { h, Component, render } from './preact.js?n=1932';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1932!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
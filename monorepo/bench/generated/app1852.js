  import { h, Component, render } from './preact.js?n=1852';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1852!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from './preact.js?n=1924';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1924!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
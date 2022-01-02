  import { h, Component, render } from './preact.js?n=6334';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6334!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
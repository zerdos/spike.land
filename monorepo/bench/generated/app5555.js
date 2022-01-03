  import { h, Component, render } from './preact.js?n=5555';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5555!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
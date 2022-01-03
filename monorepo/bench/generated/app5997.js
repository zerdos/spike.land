  import { h, Component, render } from './preact.js?n=5997';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5997!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
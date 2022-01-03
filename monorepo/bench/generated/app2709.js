  import { h, Component, render } from './preact.js?n=2709';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2709!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
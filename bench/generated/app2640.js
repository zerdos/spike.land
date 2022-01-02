  import { h, Component, render } from './preact.js?n=2640';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2640!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
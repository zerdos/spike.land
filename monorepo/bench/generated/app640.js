  import { h, Component, render } from './preact.js?n=640';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 640!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
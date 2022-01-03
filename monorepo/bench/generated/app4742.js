  import { h, Component, render } from './preact.js?n=4742';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4742!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
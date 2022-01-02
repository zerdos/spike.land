  import { h, Component, render } from './preact.js?n=6580';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6580!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
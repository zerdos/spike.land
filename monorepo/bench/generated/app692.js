  import { h, Component, render } from './preact.js?n=692';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 692!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
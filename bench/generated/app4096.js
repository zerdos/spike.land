  import { h, Component, render } from './preact.js?n=4096';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4096!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from './preact.js?n=8851';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8851!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
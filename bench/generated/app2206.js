  import { h, Component, render } from './preact.js?n=2206';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2206!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
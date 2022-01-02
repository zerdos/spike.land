  import { h, Component, render } from './preact.js?n=7698';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7698!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
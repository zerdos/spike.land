  import { h, Component, render } from './preact.js?n=8178';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8178!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from './preact.js?n=6761';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6761!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
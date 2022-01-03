  import { h, Component, render } from './preact.js?n=7638';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7638!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from './preact.js?n=343';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 343!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
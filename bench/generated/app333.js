  import { h, Component, render } from './preact.js?n=333';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 333!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
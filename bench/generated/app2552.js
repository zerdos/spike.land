  import { h, Component, render } from './preact.js?n=2552';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2552!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
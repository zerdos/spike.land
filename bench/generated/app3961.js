  import { h, Component, render } from './preact.js?n=3961';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3961!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
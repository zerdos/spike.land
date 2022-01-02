  import { h, Component, render } from './preact.js?n=4961';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4961!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
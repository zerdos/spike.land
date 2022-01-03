  import { h, Component, render } from './preact.js?n=5238';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5238!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
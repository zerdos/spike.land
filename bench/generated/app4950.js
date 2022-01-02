  import { h, Component, render } from './preact.js?n=4950';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4950!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
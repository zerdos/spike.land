  import { h, Component, render } from './preact.js?n=3199';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3199!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from './preact.js?n=777';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 777!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
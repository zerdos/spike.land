  import { h, Component, render } from './preact.js?n=2140';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2140!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
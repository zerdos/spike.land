  import { h, Component, render } from './preact.js?n=1875';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1875!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
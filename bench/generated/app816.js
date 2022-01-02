  import { h, Component, render } from './preact.js?n=816';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 816!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
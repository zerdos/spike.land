  import { h, Component, render } from './preact.js?n=2728';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2728!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
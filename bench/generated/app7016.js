  import { h, Component, render } from './preact.js?n=7016';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7016!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
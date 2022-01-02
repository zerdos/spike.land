  import { h, Component, render } from './preact.js?n=9885';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9885!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
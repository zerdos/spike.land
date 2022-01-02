  import { h, Component, render } from './preact.js?n=6885';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6885!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
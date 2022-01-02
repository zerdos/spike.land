  import { h, Component, render } from './preact.js?n=8711';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8711!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
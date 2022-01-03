  import { h, Component, render } from './preact.js?n=5470';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5470!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
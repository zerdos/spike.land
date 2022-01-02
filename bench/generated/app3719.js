  import { h, Component, render } from './preact.js?n=3719';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3719!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from './preact.js?n=5421';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5421!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from './preact.js?n=8486';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8486!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
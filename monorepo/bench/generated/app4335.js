  import { h, Component, render } from './preact.js?n=4335';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4335!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
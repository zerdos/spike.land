  import { h, Component, render } from './preact.js?n=7335';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7335!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
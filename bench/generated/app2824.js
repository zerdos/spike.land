  import { h, Component, render } from './preact.js?n=2824';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2824!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
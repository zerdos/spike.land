  import { h, Component, render } from './preact.js?n=2245';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2245!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
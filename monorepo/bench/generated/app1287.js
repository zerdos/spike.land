  import { h, Component, render } from './preact.js?n=1287';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1287!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
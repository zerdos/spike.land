  import { h, Component, render } from './preact.js?n=1336';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1336!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
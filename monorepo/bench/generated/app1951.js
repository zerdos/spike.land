  import { h, Component, render } from './preact.js?n=1951';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1951!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
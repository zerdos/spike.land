  import { h, Component, render } from './preact.js?n=8202';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8202!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
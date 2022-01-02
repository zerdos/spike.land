  import { h, Component, render } from './preact.js?n=7655';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7655!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
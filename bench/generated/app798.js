  import { h, Component, render } from './preact.js?n=798';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 798!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from './preact.js?n=7523';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7523!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
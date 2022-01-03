  import { h, Component, render } from './preact.js?n=9036';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9036!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
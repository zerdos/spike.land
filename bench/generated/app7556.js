  import { h, Component, render } from './preact.js?n=7556';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7556!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
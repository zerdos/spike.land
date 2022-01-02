  import { h, Component, render } from './preact.js?n=8627';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8627!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
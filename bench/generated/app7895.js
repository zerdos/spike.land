  import { h, Component, render } from './preact.js?n=7895';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7895!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
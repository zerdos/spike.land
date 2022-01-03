  import { h, Component, render } from './preact.js?n=5067';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5067!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
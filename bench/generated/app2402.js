  import { h, Component, render } from './preact.js?n=2402';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2402!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
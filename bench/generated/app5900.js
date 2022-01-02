  import { h, Component, render } from './preact.js?n=5900';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5900!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
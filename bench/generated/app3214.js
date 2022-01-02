  import { h, Component, render } from './preact.js?n=3214';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3214!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
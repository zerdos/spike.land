  import { h, Component, render } from './preact.js?n=2695';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2695!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
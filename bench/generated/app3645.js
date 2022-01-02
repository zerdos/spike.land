  import { h, Component, render } from './preact.js?n=3645';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3645!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
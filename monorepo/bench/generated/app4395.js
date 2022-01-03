  import { h, Component, render } from './preact.js?n=4395';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4395!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from './preact.js?n=1988';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1988!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
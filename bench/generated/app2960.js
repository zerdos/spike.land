  import { h, Component, render } from './preact.js?n=2960';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2960!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
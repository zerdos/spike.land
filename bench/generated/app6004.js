  import { h, Component, render } from './preact.js?n=6004';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6004!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
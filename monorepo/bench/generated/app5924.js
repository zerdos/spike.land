  import { h, Component, render } from './preact.js?n=5924';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5924!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
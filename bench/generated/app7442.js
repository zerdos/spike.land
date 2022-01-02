  import { h, Component, render } from './preact.js?n=7442';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7442!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
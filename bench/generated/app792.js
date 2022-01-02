  import { h, Component, render } from './preact.js?n=792';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 792!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
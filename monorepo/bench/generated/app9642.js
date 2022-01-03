  import { h, Component, render } from './preact.js?n=9642';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9642!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
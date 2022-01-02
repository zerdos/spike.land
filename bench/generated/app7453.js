  import { h, Component, render } from './preact.js?n=7453';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7453!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
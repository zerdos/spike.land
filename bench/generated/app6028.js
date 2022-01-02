  import { h, Component, render } from './preact.js?n=6028';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6028!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
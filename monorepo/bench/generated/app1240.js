  import { h, Component, render } from './preact.js?n=1240';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1240!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
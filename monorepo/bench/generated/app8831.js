  import { h, Component, render } from './preact.js?n=8831';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8831!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
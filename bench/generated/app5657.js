  import { h, Component, render } from './preact.js?n=5657';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5657!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
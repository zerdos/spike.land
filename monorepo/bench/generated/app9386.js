  import { h, Component, render } from './preact.js?n=9386';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9386!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
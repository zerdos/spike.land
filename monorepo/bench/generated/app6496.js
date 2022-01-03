  import { h, Component, render } from './preact.js?n=6496';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6496!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
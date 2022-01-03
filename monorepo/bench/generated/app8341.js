  import { h, Component, render } from './preact.js?n=8341';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8341!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
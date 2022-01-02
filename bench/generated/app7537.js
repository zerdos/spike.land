  import { h, Component, render } from './preact.js?n=7537';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7537!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
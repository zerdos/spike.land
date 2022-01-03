  import { h, Component, render } from './preact.js?n=817';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 817!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
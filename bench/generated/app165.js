  import { h, Component, render } from './preact.js?n=165';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 165!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
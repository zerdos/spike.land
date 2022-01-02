  import { h, Component, render } from './preact.js?n=4037';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4037!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
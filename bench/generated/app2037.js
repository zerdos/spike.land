  import { h, Component, render } from './preact.js?n=2037';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2037!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
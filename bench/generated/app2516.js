  import { h, Component, render } from './preact.js?n=2516';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2516!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from './preact.js?n=9962';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9962!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
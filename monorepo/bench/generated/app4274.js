  import { h, Component, render } from './preact.js?n=4274';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4274!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
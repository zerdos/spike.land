  import { h, Component, render } from './preact.js?n=6732';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6732!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
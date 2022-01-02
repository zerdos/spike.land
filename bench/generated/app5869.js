  import { h, Component, render } from './preact.js?n=5869';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5869!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
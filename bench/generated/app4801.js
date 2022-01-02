  import { h, Component, render } from './preact.js?n=4801';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4801!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
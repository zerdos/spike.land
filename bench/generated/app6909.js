  import { h, Component, render } from './preact.js?n=6909';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 6909!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
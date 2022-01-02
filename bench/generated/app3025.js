  import { h, Component, render } from './preact.js?n=3025';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3025!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
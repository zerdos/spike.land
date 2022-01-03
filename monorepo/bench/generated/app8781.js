  import { h, Component, render } from './preact.js?n=8781';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8781!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from './preact.js?n=4771';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4771!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
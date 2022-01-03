  import { h, Component, render } from './preact.js?n=3517';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3517!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
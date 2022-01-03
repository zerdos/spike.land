  import { h, Component, render } from './preact.js?n=2484';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2484!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
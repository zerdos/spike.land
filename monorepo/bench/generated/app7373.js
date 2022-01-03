  import { h, Component, render } from './preact.js?n=7373';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7373!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
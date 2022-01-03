  import { h, Component, render } from './preact.js?n=7029';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7029!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
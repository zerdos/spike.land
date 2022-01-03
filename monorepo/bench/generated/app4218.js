  import { h, Component, render } from './preact.js?n=4218';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4218!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
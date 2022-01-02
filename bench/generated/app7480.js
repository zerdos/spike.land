  import { h, Component, render } from './preact.js?n=7480';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7480!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
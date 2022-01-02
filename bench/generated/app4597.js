  import { h, Component, render } from './preact.js?n=4597';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4597!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
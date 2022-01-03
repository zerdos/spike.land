  import { h, Component, render } from './preact.js?n=2910';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 2910!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
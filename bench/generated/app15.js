  import { h, Component, render } from './preact.js?n=15';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 15!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
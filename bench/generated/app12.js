  import { h, Component, render } from './preact.js?n=12';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 12!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from './preact.js?n=5912';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 5912!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
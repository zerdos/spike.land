  import { h, Component, render } from './preact.js?n=644';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 644!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
  import { h, Component, render } from './preact.js?n=8558';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 8558!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
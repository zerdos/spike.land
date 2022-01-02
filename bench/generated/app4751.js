  import { h, Component, render } from './preact.js?n=4751';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 4751!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
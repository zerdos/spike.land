  import { h, Component, render } from './preact.js?n=7631';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7631!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
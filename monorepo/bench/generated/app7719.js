  import { h, Component, render } from './preact.js?n=7719';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 7719!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
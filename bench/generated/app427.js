  import { h, Component, render } from './preact.js?n=427';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 427!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
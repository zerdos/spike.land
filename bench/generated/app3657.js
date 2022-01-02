  import { h, Component, render } from './preact.js?n=3657';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3657!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
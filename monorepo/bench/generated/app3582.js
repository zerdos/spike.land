  import { h, Component, render } from './preact.js?n=3582';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3582!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
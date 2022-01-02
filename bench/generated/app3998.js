  import { h, Component, render } from './preact.js?n=3998';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3998!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
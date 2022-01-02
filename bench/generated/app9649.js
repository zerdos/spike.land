  import { h, Component, render } from './preact.js?n=9649';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 9649!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
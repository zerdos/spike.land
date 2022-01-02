  import { h, Component, render } from './preact.js?n=3981';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 3981!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
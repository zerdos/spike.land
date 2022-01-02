  import { h, Component, render } from './preact.js?n=1153';

  export class App extends Component {
    render() {
      return h('h1', null, 'Hello, world 1153!');
    }
  }

  const el = document.createElement('div');
  render(h(App), el);
  
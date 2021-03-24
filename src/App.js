import React from 'react';
import './App.css';

class Calculator extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      display: '0',
      previous: '',
      current: '0',
      result: '',
      rows: 1,
      restart : false
    }
    this.text = React.createRef();
  }

  render()
  {
    return (
      <div id="calculator">
        <textarea id="store" ref={this.text} rows={this.state.rows} cols={26} value={this.state.previous + this.state.current} readOnly/>
        <input type="text" id="display" value={this.state.display} readOnly/>
        <div id="container">
            <button id="seven" value="7">7</button>
            <button id="eight" value="8">8</button>
            <button id="nine" value="9">9</button>
            <button id="divide" value="/">/</button>
            <button id="four" value="4">4</button>
            <button id="five" value="5">5</button>
            <button id="six" value="6">6</button>
            <button id="multiply" value="x">x</button>
            <button id="one" value="1">1</button>
            <button id="two" value="2">2</button>
            <button id="three" value="3">3</button>
            <button id="subtract" value="-">-</button>
            <button id="decimal" value=".">.</button>
            <button id="zero" value="0">0</button>
            <button id="add" value="+">+</button>
            <button id="clear" value="AC">AC</button>
            <button id="equals" value="=">=</button>
        </div>
      </div>
    )
  }

  componentDidMount()
  {
    Array.from(document.getElementsByTagName("button")).forEach(x => x.addEventListener('click', (event) => {
      if (this.state.restart)
      {
        this.setState({
          'restart': false,
          'previous': '',
          'current': this.state.result,
          'rows': 1,
          'result': ''
        })
      }
      switch (event.target.value)
      {
        case 'AC':
          this.setState({
            'display': '0',
            'previous': '',
            'current': '0',
            'rows': 1,
            'result': ''
          })
          break;
        case 'x':
        case '/':
        case '+':
          this.setState({'display': ''});
          if (['x', '/', '+', '-'].indexOf(this.state.current[this.state.current.length - 1]) > -1)
          {
            if (['-'].indexOf(this.state.current[this.state.current.length - 2]) < 0)
              this.setState({'current': this.state.current.substring(0, this.state.current.length - 2) + event.target.value})
          }
          else this.setState({'previous': this.state.previous + this.state.current, 'current': event.target.value })
          break;
        case '-':
          if (['-'].indexOf(this.state.current[this.state.current.length - 1]) > -1)
          {
            if (['-', '+', 'x', '/'].indexOf(this.state.current[this.state.current.length - 2]) < 0)
            this.setState({'current': this.state.current + '-'})
          }
          else
          {
            this.setState({'display': '', 'current': this.state.current + '-'});
          }
          break;
        case '=':
          this.setState({'previous': this.state.previous + this.state.current, 'current': ''});
          let equation = this.state.previous.replace(/x/g, '*').replace(/--/g, '- -');
          this.setState({'result': eval(equation)});
          this.setState({'display': this.state.result.toString().substring(0, 15), 'restart': true});
          break;
        default:
          if ((this.state.display.length < 15))
          {
            if (this.state.current === '0' && event.target.value !== '.') 
            {
              this.setState({'display': '', 'current': ''})
            }

            if (event.target.value !== '.')
            {
              this.setState({
                'display': this.state.display + event.target.value,
                'current': this.state.current + event.target.value
              });
            }
            else
            {
              if(this.state.display.indexOf('.') < 0)
              {
                this.setState({
                  'display': this.state.display + event.target.value,
                  'current': this.state.current + event.target.value
                });
              }
            }
          }
          break;
      }
      if ((this.state.previous.length + this.state.current.length) > 0)
      {
        let val = (this.state.previous.length + this.state.current.length) / this.text.current.cols;
        if (val % 1 !== 0) val = Math.floor(val) + 1
        else val = Math.floor(val)
        this.setState({'rows': val});
      }
    }))
  }
}

function App() {
  return (
    <div className="App">
      <Calculator />
      <p>Designed and Coded By Precious Betine</p>
    </div>
  );
}

export default App;

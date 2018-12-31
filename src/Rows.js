import React from 'react';
import './Rows.css';
import $ from 'jquery';

class Table extends React.Component {
   render() {
      return (
        <table>
          <tbody>
            <tr>
              <th>Position</th>
              <th>Username</th>
              <th className='recent' onClick={() => this.props.callbackFromParent('recent')}>Last 30 days</th>
              <th className='alltime' onClick={() => this.props.callbackFromParent('alltime')}>All Time</th>
            </tr>
            {this.props.array.map(function(item, index) {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>
                    <img src={item.img} alt={item.username}/>
                    <a href={'https://www.freecodecamp.org/'+item.username} target='blank'>
                      {item.username}
                    </a>
                  </td>
                  <td>{item.recent}</td>
                  <td>{item.alltime}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )
    }
}


class Rows extends React.Component {
  constructor() {
    super();
    this.state = {
      alltime: [],
      recent: [],
      tag: 'recent'
    }
    this.handleChange = this.handleChange.bind(this);
    this.getData = this.getData.bind(this);
  }
  
  handleChange(dataFromChild) {
    if (dataFromChild !== this.state.tag) {
      this.setState({ tag: dataFromChild });
    };
  }
  
  getData() {
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/alltime')
      .then(response => response.json())
      .then(data => this.setState({alltime: data}));
    
    fetch('https://fcctop100.herokuapp.com/api/fccusers/top/recent')
      .then(response => response.json())
      .then(data => this.setState({recent: data}));
  }
  
  componentWillMount() {
    console.log('componentWillMount()');
    this.getData();
  }
  
  componentDidMount() {
    console.log('componentDidMount()');
  }
  
  componentDidUpdate(prevProps, prevState) {
    console.log('componentDidUpdate()');
    $('.' + prevState.tag).css('text-decoration', 'none');
    $('.' + this.state.tag).css('text-decoration', 'underline overline');
  }
  
  render() {
    console.log('render()');
    return (
      <Table array={this.state[this.state.tag]} callbackFromParent={this.handleChange} />
      )
  }
  
}

export default Rows;
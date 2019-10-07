import React, { Component, Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faPlus, faMinus, faPen } from '@fortawesome/free-solid-svg-icons';
import { CSSTransition } from 'react-transition-group';
import './style.css'
class TodoList extends Component{
  constructor(props){
    super(props);
    this.state = {
      inputValue : "",
      list : ["Perfect","Thinking outloud","Shape of you"],
      active : [0,0,0],
      plus: true
      // trashbin: [0,0,0]
    }
    this.handleBtnClick = this.handleBtnClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleItemDelete = this.handleItemDelete.bind(this);
    this.handleItemClick = this.handleItemClick.bind(this);
    this.handlePlusClick = this.handlePlusClick.bind(this);

  }
  render(){
    let getTodoList = this.state.list.map((item,index) => {
      return (<Fragment key={index}>
                <li key={index}
                  className = {!this.state.active[index] ? '':'done'}
                  onClick = {(e) => this.handleItemClick(index,e)}
                >
                  <span 
                      onClick = {(e) => this.handleItemDelete(index,e)}>
                    <FontAwesomeIcon className = "fatrash" icon={faTrashAlt} />
                    </span>
                {item}
                </li>
              </Fragment>)
              });
    return (
      <Fragment>
        <div id="container">
          <h1>My song list: 
            <span>
              <FontAwesomeIcon 
                id = "faplus" 
                icon={this.state.plus? faMinus:faPlus} 
                onClick = {this.handlePlusClick}
                className = {this.state.plus ? '':'add'}
              />
            </span>
          </h1>
          <CSSTransition
            in = {this.state.plus}
            timeout={400} //ms
            classNames = "fade"
            unmountOnExit 
            
          >
            <div id = "transitiondiv" key = "transitiondiv">
                <input 
                  key = "transitionInput"
                  className = {this.state.plus ? '':'extend'}
                  placeholder = "Add New Song"
                  value = {this.state.inputValue}
                  onChange = {this.handleInputChange}
                />
                <span
                  key = "transitionButton"
                  className = {this.state.plus ? '':'extend'}
                  id ="motherfucker"
                  onClick = {this.handleBtnClick}
                >
                <FontAwesomeIcon icon={faPen} />
                </span>
              </div>
            </CSSTransition>
          <ul id = "listitem">
            {getTodoList}
          </ul>
        </div>
      </Fragment>
      )
    
  }

  //函数在render之外
  handleBtnClick(){
      if(this.state.inputValue !== ""){
        this.setState({list:[...this.state.list,this.state.inputValue],inputValue: "",active:[...this.state.active,0]}) ;
      }; 
  }
  handleInputChange(e){
      
      this.setState({inputValue:e.target.value})
  }
  handleItemDelete(index,e){

    const newList = [...this.state.list]
    newList.splice(index,1);
    console.log(newList);
    
    const newActive = [...this.state.active];
    newActive.splice(index,1);
    console.log(newActive);
    this.setState({list:newList,active:newActive});
  }
  handleItemClick(index,e){
    if(e.target.nodeName==="LI"){
      console.log(e.target.nodeName);
        const newActive = [...this.state.active];
        newActive[index] = !newActive[index];
        console.log(newActive);
        this.setState({active:newActive});
      }
  }
  handlePlusClick(){
    console.log(this.state.plus);
    const newPlus = !this.state.plus;
    this.setState({plus: newPlus});
  }
}

export default TodoList;

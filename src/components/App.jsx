import { Component } from 'react';
import { nanoid } from 'nanoid';
import {ContactForm} from "./ContactForm/ContactForm"
import {ContactList} from "./ContactList/ContactList"
import {Filter} from "./Filter/Filter"


export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  handleChengeName = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleFilter = () => {
    console.log(this.state.contacts)
    return this.state.contacts.filter(element =>
      element.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );
  };

  handleSubmit = (name, number) => {
    if (this.state.contacts.some(contact => contact.name === name)) {
       return alert(`${name} is already in contacts`);
     }
    this.setState(prevState => {
      return {
        contacts: [
          ...prevState.contacts,
          { name, number, id: nanoid() },
        ],
      };
    });
  };

  btnDeleteConatact = id => {
    this.setState(prevState => {
      return { contacts: prevState.contacts.filter(item => item.id !== id) };
    });
  };
  

  render() {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexWrap: 'nowrap',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
          // flexWrap: 'wrap',
          flexDirection: 'column',
        }}
      ><h1>Phonebook</h1>
      <ContactForm contacts = {this.state.contacts} chengeName = {this.handleChengeName} submit = {this.handleSubmit}/>
      <h2>Contacts</h2>
      <Filter chengeName = {this.handleChengeName} />
      <ContactList deleteBtn={this.btnDeleteConatact} filterFn = {this.handleFilter()}/>
      </div>
    );
  }
}

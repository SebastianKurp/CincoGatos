import React, { Component } from 'react';
import FlashcardService from './FlashcardService';
import axios from 'axios';
import FlashcardTable from './FlashcardTable';

class IndexFlashcard extends Component {

  constructor(props) {
      super(props);
      this.state = {value: '', items: ''};
      this.addItemService = new FlashcardService();
    }
    componentDidMount(){
      axios.get('http://localhost:4200/flashcards')
      .then(response => {
        this.setState({ flashcards: response.data });
      })
      .catch(function (error) {
        console.log(error.response); //added .response
      })
    }
    tabRow(){
      if(this.state.flashcards instanceof Array){
        return this.state.flashcards.map(function(object, i){
            return <FlashcardTable obj={object} key={i} />;
        })
      }
    }

    render() {
      return (
        <div className="container">
            <table className="table table-striped">
              <thead>
                <tr>
                  <td>No.</td>
                  <td>Item</td>
                </tr>
              </thead>
              <tbody>
                {this.tabRow()}
              </tbody>
            </table>
        </div>
      );
    }
  }

export default IndexFlashcard;

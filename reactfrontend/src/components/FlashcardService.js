import axios from 'axios';

class FlashcardService {

  sendData(data) {
    axios.post('http://localhost:4200/flashcards/add/post', {
    flashcard: data
  })
  .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  }

  updateData(data, id){
  axios.post('http://localhost:4200/flashcards/update/'+id, {
    flashcard: data
  })
  .then(res => this.setState({ flashcards: res.data }))
  .catch(err => console.log(err))
}

deleteData(id){
    axios.get('http://localhost:4200/flashcards/delete/'+id)
    .then(console.log('Deleted')).catch(err => console.log(err))
  }
}

export default FlashcardService;

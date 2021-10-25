const RefereeList = {
  data() {
    return {
      referees: [],
      refereeForm: {},
      selectedReferee: null
    }
  },

  computed: {},
  methods: {
      
      fetchRefereeData() {
          fetch('/api/referee/index.php')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.referees = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      },

      postBook(evt) { // evt - object 
        console.log ("Test:", this.selectedBook);
      if (this.selectedBook) { // if it's not null/info exists, call posteditbook, if the info doesn't exist, then its a new entry
          this.postEditBook(evt);
      } else {
          this.postNewBook(evt);
      }
    },

    postEditBook(evt) {
        this.bookForm.id = this.selectedBook.id;
        // this.offerForm.studentId = this.selectedStudent.id;        
        
        console.log("Editing!", this.bookForm);
        alert("Editing!");
        fetch('api/book/update.php', {
            method:'POST',
            body: JSON.stringify(this.bookForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;
            
            // reset the form
            this.handleResetEdit();
          });
    },

      postNewReferee(evt) { //event handler for form submission, event object is the default 
          //select the student id and add another offer into this student     
          console.log("Posting:", this.refereeForm);
          alert("Posting!");

          fetch('api/referee/create.php', {
              method:'POST',
              body: JSON.stringify(this.refereeForm),
              headers: {
              "Content-Type": "application/json; charset=utf-8"
              }
          })
          .then( response => response.json() )
          .then( json => {
              console.log("Returned from post:", json);
              // TODO: test a result was returned!
              this.referees = json;
              
              // reset the form
              this.refereeForm = {};
          });
      }

  },

  created() {
      this.fetchRefereeData();
  }

}

Vue.createApp(RefereeList).mount('#refereelist');
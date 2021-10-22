const RefereeList = {
  data() {
    return {
      referees: [],
      refereeForm: {}
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

      // postNewBook(evt) { //event handler for form submission, event object is the default 
      //     //select the student id and add another offer into this student     
      //     console.log("Posting:", this.bookForm);
      //     alert("Posting!");

      //     fetch('api/book/create.php', {
      //         method:'POST',
      //         body: JSON.stringify(this.bookForm),
      //         headers: {
      //         "Content-Type": "application/json; charset=utf-8"
      //         }
      //     })
      //     .then( response => response.json() )
      //     .then( json => {
      //         console.log("Returned from post:", json);
      //         // TODO: test a result was returned!
      //         this.books = json;
              
      //         // reset the form
      //         this.bookForm = {};
      //     });
      // }

  },

  created() {
      this.fetchRefereeData();
  }

}

Vue.createApp(RefereeList).mount('#refereelist');
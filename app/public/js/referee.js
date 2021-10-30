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

      postReferee(evt) { // evt - object 
        console.log ("Test:", this.selectedReferee);
      if (this.selectedReferee) { // if it's not null/info exists, call posteditbook, if the info doesn't exist, then its a new entry
          this.postEditReferee(evt);
      } else {
          this.postNewReferee(evt);
      }
    },

    postEditReferee(evt) {
        this.refereeForm.id = this.selectedReferee.id;       
        
        console.log("Editing!", this.refereeForm);
        alert("Editing!");
        fetch('api/referee/update.php', {
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
      },

      postDeleteReferee(r) {  
        if ( !confirm("Are you sure you want to delete referee " + r.firstname + "?") ) {
            return;
        }  
        
        console.log("Delete!", r);

        fetch('api/referee/delete.php', {
            method:'POST',
            body: JSON.stringify(r),
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
            this.handleResetEdit();
          });
      },

      handleEditReferee(referee) {
        this.selectedReferee = referee;
        this.refereeForm = Object.assign({}, this.selectedReferee);
    },
      handleResetEdit() { 
        this.selectedReferee = null;
        this.refereeForm = {};
    }

  },

  created() {
      this.fetchRefereeData();
  }

}

Vue.createApp(RefereeList).mount('#refereelist');
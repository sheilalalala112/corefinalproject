const refereeList = {
    data() {
      return {
        referees: []
        refereeForm: {}
      }
    },

    computed: {},
    methods: {
        
        fetchRefereeData() {
            fetch('/api/referee/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referees = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        postNewReferee(evt) { //event handler for form submission, event object is the default 
            //select the student id and add another offer into this student
            //WHAT??
            // this.offerForm.studentId = this.selectedStudent.id; //now we can insert a new row in the table       
<<<<<<< Updated upstream
            console.log("Posting:", this.refereeForm);
=======
            console.log("Posting:", this.offerForm);
>>>>>>> Stashed changes
            alert("Posting!");

            fetch('api/referee/referee.php', {
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
  
  Vue.createApp(refereeList).mount('#refereelist');
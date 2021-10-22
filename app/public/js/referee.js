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
            fetch('/api/referee/referee.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.referees = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        postNewReferee(evt) {      
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
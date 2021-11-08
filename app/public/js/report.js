const SomeApp = {
    data() {
      return {
        assignments: []
      }
    },
    methods: {
       
        fetchAssignmentData() {
            fetch('/api/report/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.assignments = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        }
    },
    created() {
        this.fetchAssignmentData();
    }
  }
  
  Vue.createApp(SomeApp).mount('#reportApp');
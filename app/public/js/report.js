const SomeApp = {
    data() {
      return {
        assignments: []
        // filter: " "
      }
    },

   
    // computed: {
    //     filteredRows() {
    //       return this.assignments.filter(row => {
    //         const status = assignments.refereestatus.toString().toLowerCase();
    //         // const department = row.department.toLowerCase();
    //         const searchTerm = this.filter.toLowerCase();
      
    //         return assignments.includes(searchTerm) ||
    //           status.includes(searchTerm);
    //       });
    //     }
    //   },

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

        //filter the table
        // myFunction() {
        //     var input, filter, table, tr, td, i, txtValue;
        //     input = assignment.getElementById("myInput");
        //     filter = input.value.toUpperCase();
        //     table = assignment.getElementById("myTable");
        //     tr = table.getElementsByTagName("tr");
        //     for (i = 0; i < tr.length; i++) {
        //     td = tr[i].getElementsByTagName("td")[0];
        //     if (td) {
        //         txtValue = td.textContent || td.innerText;
        //         if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //         tr[i].style.display = "";
        //         } else {
        //         tr[i].style.display = "none";
        //         }
        //     }       
        //     }
        // }

    },
    created() {
        this.fetchAssignmentData();
    }
  }
  
  Vue.createApp(SomeApp).mount('#reportApp');
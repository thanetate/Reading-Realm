Google API Notes

Setup:

    1. Go to Google API Library and sign-in.
    2. Create a project
    3. Search for Books API
    4. Enable Books API
    5. Create credentials
    6. Then copy API key
    7. Add the API key and 
       Books API URL (https://www.googleapis.com/books/v1/volumes) to the code
       somewhere, most likely a good idea to add as a constant.

General Info:

        HTTP GET request:

        https://www.googleapis.com/books/v1/volumes?q=...

        .get(URL)
        .query({q: ...}) example: this.state.searchField

        q=... : search for volumes that contain this text string. There are special
        keywords we can specify in the search terms to search in particular fields
        such as:

            intitle: returns results where the text is found in the title
            inauthor: "" author
            inpublisher: "" publisher
            subject: ""the category list of the volume
            isbn: "" IBSN number
            lccn: "" Library of Congress control number    
            oclc: "" Online computer library center number
        
        *NOTE: most likely won't utilize lccn and oclc.

        Example searching for Daniel Keyes "Flowers for Algeron"
        i.e. GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes&key=APIKey

Currently, the API key is based on public data.

*TBD NOTE: Additionally, we may not need to implement Atlas search for the books,
however, if we want to add social functionality, then we may need to add 
it to navigate our database.

*LEGAL NOTE: I don't think we can store/save the Google Books API data in a database.

GraphQL - query language for APIs 

import Books from "./Books.js"

export const bookController = {


    getAllBook: async (req, resp) => {
        try {
            const books = await Books.find();
            resp.status(200).json({books});
        }catch (error) {
            console.log("exception " + error);
            resp.status(500).json("error occured " + error);
        }
    },
       
    updateBookStatus: async (req, resp) => {
        try {

            const status = req.params.status;
            const bookID = req.params.bookId;

            await  Books.findOneAndUpdate({bookId: bookID}, { isAvailable: status }, { new: true });
            console.log("Book Service updated book DB");
            resp.status(200).json("Book Status is updated Successfully");
        }catch (error) {
            console.log("exception " + error);
            resp.status(500).json("error occured " + error);
        }
    },

    getBookbyID: async (req, resp) => {
        try {
            const bookID = req.params.bookId;
            console.log("we are in book service " + bookID);
            const bookbyId = await Books.findOne({bookId: bookID})
            if(bookbyId){

                const book = {
                    bookId: bookbyId.bookId,
                    name: bookbyId.name,
                    media: {
                      type: bookbyId.media?.type,
                      source: bookbyId.media.source
                      },
                    isAvailable: bookbyId.isAvailable,
                    borrowedByUser : {
                      userId: bookbyId.borrowedByUser?.userId,
                      userName: bookbyId.borrowedByUser?.userName
                    }
                  }
                  resp.json(book);
            }else   {
                resp.status(404).json(null);
            }                  
    }
    catch (error) {
        console.log("exception " + error);
        resp.status(500).json("error occured " + error);
    }
}
}
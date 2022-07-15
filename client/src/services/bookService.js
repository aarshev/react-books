const baseUrl = 'http://localhost:3005/api/books'

export const getAll = async() => {
    const response = await fetch(`${baseUrl}`);
    const result = await response.json();
    
    return result.books; 
}

export const getOne = async (bookId) => {
    const response = await fetch(`${baseUrl}/${bookId}`)
    const result =  await response.json();

    return result.book;
};

export const create = async (bookData) => {
    console.log(bookData)
    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(bookData)
    });
    

    if (response.ok) {
        const result = await response.json();

        return result.book;
    } else {
        throw { message: 'Unable to create book' };
    }
}
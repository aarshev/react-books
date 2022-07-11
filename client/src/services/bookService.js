const baseUrl = 'http://localhost:3005/api/books'

export const getAll = async() => {
    const response = await fetch(`${baseUrl}`);
    const result = await response.json();
    
    return result.books; 
}

export const getOne = async (bookId) => {
    const response = await fetch(`${baseUrl}/${bookId}`)
    const result =  await response.json();

    return result.user;
};
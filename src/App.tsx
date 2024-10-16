import React, { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
}

export const BookFilter: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [editBook, setEditingBook] = useState<number | null>(null);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleAddBook = () => {
    if (title && author) {
      const newBook: Book = {
        id: Math.floor(Math.random() * 10000),
        title: title,
        author: author,
      };
      setBooks([...books, newBook]);
      setTitle('');
      setAuthor('');
      console.log(newBook);
    } else {
      alert('Please fill in both fields');
    }
  };

  const handleUpdateBook = () => {
    if (title && author && editBook !== null) {
      const updatedBooks = books.map((book) => {
        if (book.id === editBook) {
          return { ...book, title: title, author: author };
        }
        return book;
      });

      setBooks(updatedBooks);
      setTitle('');
      setAuthor('');
      setEditingBook(null);
    } else {
      alert('Please enter both title and author');
    }
  };

  const handleEditBook = (id: number) => {
    const bookToEdit = books.find((book) => book.id === id);
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setEditingBook(id);
    }
  };

  const handleDeleteBook = (id: number) => {
    const filteredBooks = books.filter((book) => book.id !== id);
    setBooks(filteredBooks);
  };

  return (
    <>
    <h1 className="text-2xl font-bold mb-4">Book List</h1>
    <div className="book-filter mb-4">
      <input
        type="text"
        name="book"
        value={title}
        placeholder='Type your title book'
        onChange={handleTitleChange}
        className="border border-gray-300 p-2 rounded mr-2"
      />
      <input
        type="text"
        name="author"
        value={author}
        placeholder='Type your author'
        onChange={handleAuthorChange}
        className="border border-gray-300 p-2 rounded mr-2"
      />
      {editBook ? (
        <button onClick={handleUpdateBook} className="bg-blue-500 text-white p-2 rounded">
          Update
        </button>
      ) : (
        <button onClick={handleAddBook} className="bg-green-500 text-white p-2 rounded">
          Add
        </button>
      )}
    </div>
    <ul className="list-disc pl-5">
      {books.map((book) => {
        return (
          <li key={book.id} className="flex justify-between items-center mb-2">
            <span>{book.title} - {book.author}</span>
            <div>
              <button onClick={() => handleEditBook(book.id)} className="bg-yellow-500 text-white p-1 rounded mr-1">Edit</button>
              <button onClick={() => handleDeleteBook(book.id)} className="bg-red-500 text-white p-1 rounded">Delete</button>
            </div>
          </li>
        );
      })}
    </ul>
  </>
  );
};

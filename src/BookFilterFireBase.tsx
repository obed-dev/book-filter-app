import React, { useState, useEffect } from 'react';
import { db } from './firebase/config'; // Asegúrate de tener configurado Firebase
import { collection, getDocs } from 'firebase/firestore';
import { addBook, editBook, deleteBook } from './services/dataService'; // Asegúrate de importar las funciones CRUD

interface Book {
  id: string; // ID será tipo string por Firestore
  title: string;
  author: string;
}

export const BookFilterApp: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [editBookId, setEditingBookId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(''); // Estado para el filtro de búsqueda

  // Leer libros desde Firebase
  const fetchBooks = async () => {
    const booksCollection = collection(db, "books");
    const booksSnapshot = await getDocs(booksCollection);
    const booksList = booksSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Book[];
    setBooks(booksList);
  };

  // useEffect para cargar los libros al montar el componente
  useEffect(() => {
    fetchBooks();
  }, []);

  // Manejar el cambio en el título
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  // Manejar el cambio en el autor
  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  // Agregar un libro a Firebase
  const handleAddBook = async () => {
    if (title && author) {
      const newBook: Omit<Book, 'id'> = { title, author };
  
      try {
        const docId = await addBook(newBook); // Llama a la función de agregar y espera el id
        setBooks([...books, { ...newBook, id: docId }]); // Usa el id devuelto
        setTitle('');
        setAuthor('');
      } catch (e) {
        console.error("Error adding book: ", e);
      }
    } else {
      alert('Please fill in both fields');
    }
  };

  // Editar un libro en Firebase
  const handleUpdateBook = async () => {
    if (title && author && editBookId !== null) {
      const updatedBook: Partial<Book> = { title, author };

      try {
        await editBook(editBookId, updatedBook); // Llama a la función de editar
        const updatedBooks = books.map((book) =>
          book.id === editBookId ? { ...book, title, author } : book
        );
        setBooks(updatedBooks);
        setTitle('');
        setAuthor('');
        setEditingBookId(null);
      } catch (e) {
        console.error("Error updating book: ", e);
      }
    } else {
      alert('Please enter both title and author');
    }
  };

  // Manejar la edición de un libro
  const handleEditBook = (id: string) => {
    const bookToEdit = books.find((book) => book.id === id);
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setEditingBookId(id);
    }
  };

  // Eliminar un libro de Firebase
  const handleDeleteBook = async (id: string, title: string) => {
    const isConfirmed = window.confirm(`Are you sure you want to delete the book: ${title}?`);
    
    if (isConfirmed) {
      try {
        await deleteBook(id); // Llama a la función de eliminar
        const filteredBooks = books.filter((book) => book.id !== id);
        setBooks(filteredBooks);
      } catch (e) {
        console.error("Error deleting book: ", e);
      }
    }
  };

  // Filtro por título de libro
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="book-filter-app">
      <h1 className="text-2xl font-bold mb-4">Book List</h1>

      {/* Input para buscar libro */}
      <input
        type="text"
        placeholder="Search by title"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded mb-4"
      />

      {/* Inputs para agregar/editar libros */}
      <div className="mb-4">
        <input
          type="text"
          name="book"
          value={title}
          placeholder="Type your book title"
          onChange={handleTitleChange}
          className="border border-gray-300 p-2 rounded mr-2"
        />
        <input
          type="text"
          name="author"
          value={author}
          placeholder="Type your author"
          onChange={handleAuthorChange}
          className="border border-gray-300 p-2 rounded mr-2"
        />
        {editBookId ? (
          <button onClick={handleUpdateBook} className="bg-blue-500 text-white p-2 rounded">
            Update
          </button>
        ) : (
          <button onClick={handleAddBook} className="bg-green-500 text-white p-2 rounded">
            Add
          </button>
        )}
      </div>

      {/* Listado de libros */}
      <ul className="list-disc pl-5">
        {filteredBooks.map((book) => (
          <li key={book.id} className="flex justify-between items-center mb-2">
            <span>{book.title} - {book.author}</span>
            <div>
              <button onClick={() => handleEditBook(book.id)} className="bg-yellow-500 text-white p-1 rounded mr-1">
                Edit
              </button>
              <button onClick={() => handleDeleteBook(book.id, book.title)} className="bg-red-500 text-white p-1 rounded">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

import { collection, addDoc , query , where , getDocs , doc, updateDoc , deleteDoc} from "firebase/firestore";
import { db } from '../firebase/config'; // Asegúrate de importar tu configuración de Firebase



interface Book {
    
  title: string;
  author: string;
  // Agrega más campos si es necesario
}

export const addBook = async (newBook: Omit<Book, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, 'books'), newBook);
    return docRef.id; // Retorna el id del documento recién agregado
  };



export const getBooksByName = async (name: string): Promise<void> => {
  const q = query(collection(db, "books"), where("title", "==", name));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
};




export const editBook = async (id: string, updatedBook: Partial<Book>): Promise<void> => {
  const bookRef = doc(db, "books", id);
  
  try {
    await updateDoc(bookRef, updatedBook);
    console.log(`Libro con ID: ${id} actualizado.`);
  } catch (e) {
    console.error("Error al actualizar libro: ", e);
  }
};




export const deleteBook = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "books", id));
    console.log(`Libro con ID: ${id} eliminado.`);
  } catch (e) {
    console.error("Error al eliminar libro: ", e);
  }
};

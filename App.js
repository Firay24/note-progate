import { StyleSheet } from "react-native";
import { useState } from "react";

import Home from "./src/screens/home";
import AddNote from "./src/screens/addNote";
import EditNote from "./src/screens/editNote";

const CurrentPageWidget = ({
  currentPage,
  noteList,
  setCurrentPage,
  addNote,
  deleteNote,
  editNote,
  currentEditing,
  noteBeingEdited,
}) => {
  switch (currentPage) {
    case "home":
      return (
        <Home
          noteList={noteList}
          setCurrentPage={setCurrentPage}
          deleteNote={deleteNote}
          currentEditing={currentEditing}
        />
      );
    case "add":
      return <AddNote setCurrentPage={setCurrentPage} addNote={addNote} />;
    case "edit":
      return (
        <EditNote
          setCurrentPage={setCurrentPage}
          editNote={editNote}
          note={noteBeingEdited}
        />
      );
    default:
      return <Home />;
  }
};

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [noteBeingEdited, setNoteBeingEdited] = useState(null);

  const [noteList, setNoteList] = useState([
    {
      id: 1,
      title: "Note pertama",
      desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ]);

  const addNote = (title, desc) => {
    const id = noteList.length > 0 ? noteList[noteList.length - 1].id + 1 : 1;

    setNoteList([
      ...noteList,
      {
        id,
        title: title,
        desc,
        desc,
      },
    ]);
  };

  const deleteNote = (id) => {
    const result = noteList.filter((note) => note.id !== id);
    setNoteList(result);
  };

  const editNote = (id, newTitle, newDesc) => {
    const updateNote = noteList.map((note) =>
      note.id === id ? { ...note, title: newTitle, desc: newDesc } : note
    );
    setNoteList(updateNote);
  };

  const currentEditing = (note) => {
    setNoteBeingEdited(note);
  };

  return (
    <CurrentPageWidget
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      noteList={noteList}
      addNote={addNote}
      deleteNote={deleteNote}
      editNote={editNote}
      currentEditing={currentEditing}
      noteBeingEdited={noteBeingEdited}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: 40,
  },
});

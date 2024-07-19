import  noteContext  from "./NoteContext"; // Import NoteContext using curly braces

const NoteState = (props) => {
  const note = [
    {
      _id: "662ccc1815485cfd5dc74893",
      user: "662cc55223dd80cf95a2283c",
      title: "my Title 1",
      desc: "my Descriptions is ",
      tags: "personal",
      date: "2024-04-27T09:57:44.557Z",
      __v: 0,
    },
    {
      _id: "662cc4c1815485cfd5dc74893",
      user: "662cc55223dd80cf95a2283c",
      title: "my Title 2",
      desc: "my Descriptions is ",
      tags: "personal",
      date: "2024-04-27T09:57:44.557Z",
      __v: 0,
    },{
      _id: "662ccc15815485cfd5dc74893",
      user: "662cc55223dd80cf95a2283c",
      title: "my Title 3",
      desc: "my Descriptions is ",
      tags: "personal",
      date: "2024-04-27T09:57:44.557Z",
      __v: 0,
    },
  ];
  return (
    <noteContext.Provider value={{ note }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;

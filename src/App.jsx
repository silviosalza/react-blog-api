import { useState } from "react";

function App() {
  //setto stato iniziale del mio input
  // const [title, setTitle] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  return (
    <>
      <main className="py-5 ">
        <div className="container mx-auto">
          <h1 className="font-bold">Articolo</h1>
          <form action="" className="flex flex-col gap-2 w-1/2">
            <label htmlFor="article_title"></label>
            <input
              className="rounded border-2 border-black"
              type="textarea"
              name="title"
              placeholder="Inserisci il titolo dell'articolo"
              value={formData.title}
              onChange={(e) => setFormData(e.target.value)}
            />
            <label htmlFor="article_content"></label>
            <textarea
              rows="5"
              className="rounded border-2 border-black"
              type="textarea"
              name="content"
              placeholder="Inserisci il contenuto"
              value={formData.content}
              onChange={(e) => setFormData(e.target.value)}
            ></textarea>
            <button className="bg-green-300 hover:bg-green-400 rounded border-2 border-black">
              Crea
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default App;

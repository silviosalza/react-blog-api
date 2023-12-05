import { useState } from "react";

function App() {
  //setto stato iniziale del mio input
  const [title, setTitle] = useState("");

  return (
    <>
      <main className="py-5 ">
        <div className="container mx-auto">
          <h1 className="font-bold">Titolo dell'articolo</h1>
          <form action="" className="flex flex-col gap-2 w-1/2">
            <label htmlFor="article_title"></label>
            <input
              className="rounded border-2 border-black"
              type="text"
              name="title"
              placeholder="Inserisci il titolo dell'articolo"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
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

import { useState } from "react";

function App() {
  const initialFormData = {
    title: "",
    content: "",
  };

  const [articles, setArticles] = useState([]);

  //setto stato iniziale del mio input
  // const [title, setTitle] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState("");

  function updateFormData(newValue, fieldName) {
    //clono oggetto usando spred, per eliminare qualsiasi riferimento allo stato attuale
    const newFormData = { ...formData };
    //aggiorno la chiave fieldName con il valore newValue
    newFormData[fieldName] = newValue;
    //passo oggetto modificato
    setFormData(newFormData);
  }
  function handleReset(e) {
    setFormData(initialFormData);
    setEditingId("");
  }

  function handleFormSubmit(e) {
    e.preventDefault(); //evita refresh pagina
    const newArticles = [...articles];
    if (!editingId) {
      //non posso modificare uno state, eseguo clonazione e aggionarmento (forma compatta)
      setArticles([...articles, { ...formData, id: crypto.randomUUID() }]);
    } else {
      const articleToEditIndex = newArticles.findIndex(
        (article) => article.id === editingId
      );
      newArticles[articleToEditIndex] = {
        ...articles[articleToEditIndex],
        ...formData,
      };
      setArticles(newArticles);
      setEditingId("");
    }

    //resetto form
    setFormData(initialFormData);
  }

  function deleteArticle(idToRemove) {
    const newArticles = [...articles];
    setArticles(newArticles.filter((article) => article.id !== idToRemove));
  }

  function editArticle(idToEdit) {
    const newArticles = [...articles];
    const articleToEdit = newArticles.find(
      (article) => article.id === idToEdit
    );
    console.log(articleToEdit);
    setEditingId(idToEdit);
    setFormData({ title: articleToEdit.title, content: articleToEdit.content });
  }

  return (
    <>
      <main className="py-5 ">
        <div className="container mx-auto">
          <h1 className="font-bold">
            {editingId ? "Modifica Articolo" : "Crea Articolo"}
          </h1>
          <form
            action=""
            className="flex flex-col gap-2 w-1/2"
            onSubmit={handleFormSubmit}
          >
            <label htmlFor="article_title"></label>
            <input
              className="rounded border-2 border-black"
              type="textarea"
              name="title"
              placeholder="Inserisci il titolo dell'articolo"
              value={formData.title}
              onChange={(e) => updateFormData(e.target.value, "title")}
            />
            <label htmlFor="article_content"></label>
            <textarea
              rows="5"
              className="rounded border-2 border-black"
              type="textarea"
              name="content"
              placeholder="Inserisci il contenuto"
              value={formData.content}
              onChange={(e) => updateFormData(e.target.value, "content")}
            ></textarea>
            <button
              type="submit"
              className="bg-green-300 hover:bg-green-400 rounded border-2 border-black font-bold"
            >
              {editingId ? "Salva" : "Crea"}
            </button>
          </form>
          <button
            type="submit"
            className="my-1 w-1/2 bg-red-300 hover:bg-red-400 rounded border-2 border-black font-bold"
            onClick={handleReset}
          >
            Annulla
          </button>
        </div>
        <div className="my-5 container mx-auto border-2 border-black">
          <ul>
            {articles.map((article) => (
              <li key={article.id}>
                <h5 className="font-bold">Titolo:</h5> {article.title} <br />
                <h5 className="font-bold">Contenuto:</h5> {article.content}
                <br />
                <button
                  className="disabled font-bold border-2 hover:bg-red-700  hover:text-white border-red-700 disabled:border-black disabled:bg-slate-400"
                  onClick={() => deleteArticle(article.id)}
                  disabled={!!editingId}
                >
                  Elimina
                </button>
                <button
                  className="font-bold border-2  hover:bg-yellow-400  hover:text-white border-yellow-400 "
                  onClick={() => editArticle(article.id)}
                >
                  Modifica
                </button>
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;

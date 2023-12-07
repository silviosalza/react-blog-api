import { useEffect, useState } from "react";

function App() {
  const initialFormData = {
    title: "",
    content: "",
    image: "",
    published: false,
    category: "",
  };

  const [articles, setArticles] = useState([]);
  //setto stato iniziale del mio input
  // const [title, setTitle] = useState("");
  const [formData, setFormData] = useState(initialFormData);
  const [editingId, setEditingId] = useState("");
  //variabile che popolo con la chiamata API
  const [postsList, setPostsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [tagsList, setTagsList] = useState([]);
  let initiated = false;

  // function updateFormData(newValue, fieldName) {
  //   //clono oggetto usando spred, per eliminare qualsiasi riferimento allo stato attuale
  //   const newFormData = { ...formData };
  //   //aggiorno la chiave fieldName con il valore newValue
  //   newFormData[fieldName] = newValue;
  //   //passo oggetto modificato
  //   setFormData(newFormData);
  // }
  function handleReset() {
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
        updatedAt: new Date(),
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
    setFormData({
      title: articleToEdit.title,
      content: articleToEdit.content,
      image: articleToEdit.image,
      category: articleToEdit.category,
    });
  }
  function handleField(e) {
    const valueField =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setFormData((current) => ({ ...current, [e.target.name]: valueField }));
  }

  //gestisco chiamata API
  async function fetchData() {
    const postsData = await (await fetch("http://localhost:3000/posts")).json();
    setPostsList(postsData);
    const categoryData = await (
      await fetch("http://localhost:3000/category")
    ).json();
    setCategoryList(categoryData);
    const tagsData = await (await fetch("http://localhost:3000/tags")).json();
    setTagsList(categoryData);
  }
  //all'avvio dell'applicazione fetchiamo i dati
  useEffect(() => {
    if (initiated) {
      return;
    }
    fetchData();
    initiated = true;
  }, []);
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
              type="text"
              name="title"
              placeholder="Inserisci il titolo dell'articolo"
              value={formData.title}
              onChange={handleField}
            />
            <label htmlFor="article_content"></label>
            <textarea
              rows="5"
              className="rounded border-2 border-black break-words"
              type="textarea"
              name="content"
              placeholder="Inserisci il contenuto"
              value={formData.content}
              onChange={handleField}
            ></textarea>
            <label htmlFor="article_image"></label>
            <input
              className="rounded border-2 border-black"
              type="text"
              name="image"
              placeholder="Inserisci URL dell'immagine copertina"
              value={formData.image}
              onChange={handleField}
            />
            <label className="font-bold" htmlFor="category">
              Categoria
            </label>
            <select
              className="rounded border-2 border-black"
              name="category"
              value={formData.category}
              onChange={handleField}
            >
              <option value=""></option>
              {categoryList.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>

            <div className="flex flex-col gap-1">
              {tagsList.map((tag) => (
                <label key={tag.id} className="block font-bold">
                  <input className="mr-3" type="checkbox" value={tag.name} />
                  {tag.name}
                </label>
              ))}
            </div>

            <span className="font-bold" htmlFor="published">
              Pubblicato
            </span>
            <input
              name="published"
              type="checkbox"
              value={formData.published}
              onChange={handleField}
            />
            <button
              type="submit"
              className="bg-green-300 hover:bg-green-400 rounded border-2 border-black font-bold"
            >
              {editingId ? "Salva" : "Crea"}
            </button>
          </form>
          <button
            type="button"
            className="my-1 w-1/2 bg-red-300 hover:bg-red-400 rounded border-2 border-black font-bold"
            onClick={handleReset}
          >
            Annulla
          </button>
        </div>
        {/*------------------------------------------------------------------- */}
        <div className="my-5 container mx-auto border-2 border-black">
          <ul>
            {postsList.map((post) => (
              <li
                key={post.id}
                className="flex-wrap mb-4 p-4 border border-gray-300 flex items-center"
              >
                <div className="flex flex-col">
                  <h5 className="font-bold mb-2">
                    Titolo: {post.title} -{" "}
                    <span className={post.published ? "" : "hidden"}>
                      Pubblicato{" "}
                    </span>
                    <span className={post.published ? "hidden" : ""}>
                      Non Pubblicato{" "}
                    </span>
                    <span
                      className={`text-xl ${
                        post.published ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      &#x2022;
                    </span>
                  </h5>
                  {
                    <h5 className="font-bold">
                      Categoria: {post.category.name}
                    </h5>
                  }
                  <img className="w-40 mb-2" src={post.image} alt="" />
                  <h5 className="font-bold mb-2">Contenuto:</h5>
                  <span className="max-w-full text-center">{post.content}</span>
                </div>
                <div className="mt-4 flex flex-col items-end">
                  <button
                    className="w-20 disabled font-bold border-2 hover:bg-red-700 hover:text-white border-red-700 disabled:border-black disabled:bg-slate-400 mb-2"
                    onClick={() => deleteArticle(post.id)}
                    disabled={!!editingId}
                  >
                    Elimina
                  </button>
                  <button
                    className="w-20 font-bold border-2 hover:bg-yellow-400 hover:text-white border-yellow-400"
                    onClick={() => editArticle(post.id)}
                  >
                    Modifica
                  </button>
                </div>
                <hr className="" />
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;

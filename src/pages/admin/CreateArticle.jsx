import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createArticle, uploadImage } from "../../services/index";
import { getAllCategoriesFlat } from "../../utils/categories";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import toast from "react-hot-toast";

const CreateArticle = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const quillRef = useRef(null);
  const youtubeUrlRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    subcategory: "",
    featured: false,
    autoDelete: false,
    is_complementary: false,
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [quillModules, setQuillModules] = useState(null);
  const [showYoutubeInput, setShowYoutubeInput] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");

  // Get all categories and subcategories
  const allCategories = getAllCategoriesFlat();
  const mainCategories = allCategories.filter((cat) => !cat.isSubcategory);
  const subcategories = allCategories.filter(
    (cat) => cat.isSubcategory && cat.parentId === formData.category
  );

  useEffect(() => {
    const initializeQuillModules = async () => {
      try {
        const ImageResize = await import("quill-image-resize-module-react");
        ReactQuill.Quill.register("modules/imageResize", ImageResize.default);

        setQuillModules({
          toolbar: {
            container: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ align: [] }],
              ["link", "image", "video"],
              ["clean"],
            ],
            handlers: {
              image: () => {
                const input = document.createElement("input");
                input.setAttribute("type", "file");
                input.setAttribute("accept", "image/*");
                input.click();

                input.onchange = async () => {
                  const file = input.files[0];
                  if (file && quillRef.current) {
                    const quill = quillRef.current.getEditor();
                    const range = quill.getSelection(true);
                    const reader = new FileReader();

                    reader.onload = (e) => {
                      quill.insertEmbed(
                        range.index,
                        "image",
                        e.target.result,
                        "user"
                      );
                      quill.setSelection(range.index + 1);
                    };

                    reader.readAsDataURL(file);
                  }
                };
              },
              video: () => {
                setShowYoutubeInput(true);
              },
            },
          },
          imageResize: {
            modules: ["Resize", "DisplaySize"],
            displaySize: true,
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
          },
          clipboard: {
            matchVisual: false, // Importante para mantener saltos de línea
          },
        });
      } catch (error) {
        console.error("Error al inicializar módulos Quill:", error);
        setQuillModules({
          toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image", "video"],
          ],
          clipboard: {
            matchVisual: false,
          },
        });
      }
    };

    initializeQuillModules();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleContentChange = (content) => {
    // Limpiar contenido vacío
    if (content === "<p><br></p>") {
      content = "<p></p>";
    }
    setFormData((prev) => ({ ...prev, content }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      category: categoryId,
      subcategory: "",
    }));
  };

  const handleDeleteMedia = (index) => {
    const content = formData.content;
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const mediaElements = doc.querySelectorAll("img, iframe");

    if (mediaElements[index]) {
      mediaElements[index].remove();
      setFormData((prev) => ({ ...prev, content: doc.body.innerHTML }));
      toast.success("Elemento eliminado correctamente");
    }
  };

  const handleAddYoutubeVideo = () => {
    if (!youtubeUrl) {
      toast.error("Por favor ingresa una URL de YouTube");
      return;
    }

    const videoId = extractYoutubeId(youtubeUrl);
    if (!videoId) {
      toast.error("URL de YouTube no válida");
      return;
    }

    const iframe = `<iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;

    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection(true) || {
        index: quill.getLength(),
        length: 0,
      };
      quill.clipboard.dangerouslyPasteHTML(range.index, iframe);
      quill.setSelection(range.index + 1);
    }

    setYoutubeUrl("");
    setShowYoutubeInput(false);
  };

  const extractYoutubeId = (url) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      setError("El título es obligatorio");
      return;
    }

    if (!formData.content.trim() || formData.content === "<p><br></p>") {
      setError("El contenido es obligatorio");
      return;
    }

    if (!formData.category) {
      setError("Debes seleccionar una categoría");
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      let imageUrl = "";

      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        imageUrl = await uploadImage(imageFile, fileName);
      }

      const articleData = {
        ...formData,
        imageUrl,
      };

      await createArticle(articleData);

      toast.success("Artículo creado correctamente");
      navigate(`/admin/articulos`);
    } catch (err) {
      console.error("Error creating article:", err);
      setError("Error al crear el artículo. Por favor intenta de nuevo.");
      toast.error("Error al crear el artículo");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "align",
    "video",
    "width",
  ];

  const ArticleContent = ({ content }) => {
    return (
      <div 
        className="ql-editor"
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowWrap: "break-word",
          maxWidth: "100%",
        }}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    );
  };

  return (
    <>
      <Helmet>
        <title>Crear Artículo - Portal de Noticias</title>
        <style>{`
          .ql-editor {
            min-height: 300px;
            white-space: pre-wrap !important;
            word-break: break-word !important;
            overflow-wrap: break-word !important;
          }
          
          .ql-editor p {
            margin-bottom: 1em !important;
          }
          
          .ql-editor p:last-child {
            margin-bottom: 0 !important;
          }
          
          .ql-editor img {
            max-width: 560px !important;
            height: 315px !important;
            display: block !important;
            margin: 1rem auto !important;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            object-fit: cover;
          }
          
          .ql-editor iframe {
            max-width: 560px !important;
            height: 315px !important;
            display: block !important;
            margin: 1rem auto !important;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          }
          
          .ql-toolbar .ql-image {
            margin: 0 auto;
          }
          
          .youtube-input-container {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0,0,0,0.7);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
          }
          
          .youtube-input-box {
            background: white;
            padding: 2rem;
            border-radius: 8px;
            width: 90%;
            max-width: 500px;
          }

          .media-preview img {
            max-width: 560px !important;
            height: 315px !important;
            object-fit: cover;
          }
        `}</style>
      </Helmet>

      <div>
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Crear Artículo</h1>
          <button
            onClick={() => navigate("/admin/articulos")}
            className="btn btn-outline"
          >
            Cancelar
          </button>
        </div>

          {/* INDICATIONS */}
        <div className="mb-8 p-4 bg-orange-50 rounded-lg shadow-lg text-sm">
          <h3 className="font-semibold text-gray-700">Indicaciones para crear una noticia</h3>
          <p>
            1. Colocar el título principal de la noticia en el campo de
            "Título".
          </p>
          <p>2. Seleccionar una categoría y subcategoría, si la hubiera.</p>
          <p>3. Opciones para las noticias:</p>
          <ul>
            <li className="ml-4">
              <strong>Marcar como destacado:</strong> Esta opción coloca la
              noticia entre las 4 primeras y la card será más grande.
            </li>
            <li className="ml-4">
              <strong>Auto-eliminar después de 1 año:</strong> Esta opción
              eliminará automáticamente la noticia después de un año de su
              publicación.
            </li>
            <li className="ml-4">
              <strong>Marcar como complementario:</strong> Esta opción coloca la
              noticia debajo del widget de X y la card será la más pequeña.
            </li>
          </ul>
          <p>4. Agregar una imagen principal, tamaño ideal 600x600 px.</p>
          <p>
            5. Contenido: Agregar el contenido de la noticia en el editor de
            texto. Aquí tiene varias opciones para la fuente de texto. También
            podrá insertar imágenes y videos por medio de un enlace de YouTube,
            seleccionando las opciones en la barra de menú de la parte superior
            del editor.
          </p>
          <p>
            6. Previsualización: En esta sección podrá previsualizar la noticia
            antes de publicarla. En la sección de artículos también podrá editar
            y/o eliminar las noticias manualmente.
          </p>
        </div>
        {/* END INDICATIONS */}

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow-md p-6"
        >
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="label">
              Título *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input"
              placeholder="Título del artículo"
              disabled={isSubmitting}
            />
          </div>

          {/* Category and Subcategory */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="category" className="label">
                Categoría *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleCategoryChange}
                className="input"
                disabled={isSubmitting}
              >
                <option value="">Seleccionar categoría</option>
                {mainCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="subcategory" className="label">
                Subcategoría
              </label>
              <select
                id="subcategory"
                name="subcategory"
                value={formData.subcategory}
                onChange={handleChange}
                className="input"
                disabled={isSubmitting || !formData.category}
              >
                <option value="">Seleccionar subcategoría</option>
                {subcategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Featured, Auto-delete, and Complementary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                disabled={isSubmitting}
              />
              <label
                htmlFor="featured"
                className="ml-2 block text-sm py-1 px-4 bg-green-50 rounded-full text-green-600"
              >
                Marcar como destacado
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="autoDelete"
                name="autoDelete"
                checked={formData.autoDelete}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                disabled={isSubmitting}
              />
              <label
                htmlFor="autoDelete"
                className="ml-2 block text-sm py-1 px-4 bg-red-50 rounded-full text-red-600"
              >
                Auto-eliminar después de 1 año
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="is_complementary"
                name="is_complementary"
                checked={formData.is_complementary}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                disabled={isSubmitting}
              />
              <label
                htmlFor="is_complementary"
                className="ml-2 block text-sm py-1 px-4 bg-blue-50 rounded-full text-blue-600"
              >
                Marcar como complementario
              </label>
            </div>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="label">Imagen</label>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="btn btn-outline"
                disabled={isSubmitting}
              >
                Seleccionar imagen
              </button>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                disabled={isSubmitting}
              />
              <span className="text-sm text-gray-500">
                {imageFile ? imageFile.name : "Ninguna imagen seleccionada"}
              </span>
              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="text-red-500 hover:text-red-700 text-sm"
                >
                  Eliminar
                </button>
              )}
            </div>

            {imagePreview && (
              <div className="mt-4 media-preview">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="rounded-md"
                />
              </div>
            )}
          </div>

          {/* Content Editor */}
          <div className="mb-6">
            <label htmlFor="content" className="label">
              Contenido *
            </label>
            {quillModules ? (
              <ReactQuill
                ref={quillRef}
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={quillModules}
                formats={formats}
                placeholder="Escribe el contenido del artículo aquí..."
                className="bg-white"
                readOnly={isSubmitting}
                style={{
                  minHeight: "300px",
                  whiteSpace: "pre-wrap",
                  wordBreak: "break-word",
                }}
              />
            ) : (
              <div className="p-4 bg-gray-100 rounded-lg text-center">
                <LoadingSpinner size="md" />
                <p className="mt-2">Cargando editor...</p>
              </div>
            )}

            {/* Vista previa con botones de eliminar */}
            {formData.content && formData.content !== "<p><br></p>" && (
              <div className="mt-4 p-4 border rounded-lg">
                <h3 className="text-sm font-medium mb-2">Vista previa:</h3>
                <div
                  style={{
                    maxWidth: "100%",
                    overflow: "hidden",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <ArticleContent content={formData.content} />
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting || !quillModules}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <LoadingSpinner size="sm" />
                  <span className="ml-2">Guardando...</span>
                </span>
              ) : (
                "Publicar Artículo"
              )}
            </button>
          </div>
        </form>

        {/* YouTube URL Input Modal */}
        {showYoutubeInput && (
          <div className="youtube-input-container">
            <div className="youtube-input-box">
              <h3 className="text-lg font-medium mb-4">
                Insertar video de YouTube
              </h3>
              <div className="flex flex-col space-y-4">
                <input
                  type="text"
                  ref={youtubeUrlRef}
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  placeholder="Pega la URL del video de YouTube"
                  className="input w-full text-center"
                  autoFocus
                />
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowYoutubeInput(false)}
                    className="btn btn-outline"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleAddYoutubeVideo}
                    className="btn btn-primary"
                  >
                    Insertar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CreateArticle;
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

    if (!formData.content.trim()) {
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

  const CustomContent = ({ content }) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const mediaElements = doc.querySelectorAll("img, iframe");

    if (mediaElements.length === 0) {
      return <div dangerouslySetInnerHTML={{ __html: content }} />;
    }

    let currentIndex = 0;
    const elements = Array.from(doc.body.childNodes).map((node, i) => {
      if (node.nodeName === "IMG" || node.nodeName === "IFRAME") {
        const index = currentIndex;
        currentIndex++;

        return (
          <div key={`media-${i}`} className="media-container relative group">
            <div dangerouslySetInnerHTML={{ __html: node.outerHTML }} />
            <button
              className="delete-media-btn absolute -top-3 -right-3 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={() => handleDeleteMedia(index)}
              title="Eliminar este elemento"
            >
              ×
            </button>
          </div>
        );
      }

      return (
        <div
          key={`node-${i}`}
          dangerouslySetInnerHTML={{ __html: node.outerHTML }}
        />
      );
    });

    return <div className="space-y-4">{elements}</div>;
  };

  return (
    <>
      <Helmet>
        <title>Crear Artículo - Portal de Noticias</title>
        <style>{`
          .ql-editor {
            min-height: 300px;
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
                className="ml-2 block text-sm text-gray-900"
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
                className="ml-2 block text-sm text-gray-900"
              >
                Auto-eliminar después de 30 días
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
                className="ml-2 block text-sm text-gray-900"
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
              />
            ) : (
              <div className="p-4 bg-gray-100 rounded-lg text-center">
                <LoadingSpinner size="md" />
                <p className="mt-2">Cargando editor...</p>
              </div>
            )}

            {/* Vista previa con botones de eliminar */}
            {formData.content && (
              <div className="mt-4 p-4 border rounded-lg">
                <h3 className="text-sm font-medium mb-2">Vista previa:</h3>
                <div className="ql-editor">
                  <CustomContent content={formData.content} />
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
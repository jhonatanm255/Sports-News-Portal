// import React, { useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { Helmet } from "react-helmet-async";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import { createArticle, uploadImage } from "../../services/articleService";
// import { getAllCategoriesFlat } from "../../utils/categories";
// import LoadingSpinner from "../../components/ui/LoadingSpinner";
// import toast from "react-hot-toast";

// const CreateArticle = () => {
//   const navigate = useNavigate();
//   const fileInputRef = useRef(null);

//   const [formData, setFormData] = useState({
//     title: "",
//     content: "",
//     category: "",
//     subcategory: "",
//     featured: false,
//     autoDelete: false,
//   });

//   const [imageFile, setImageFile] = useState(null);
//   const [imagePreview, setImagePreview] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [error, setError] = useState("");

//   // Get all categories and subcategories
//   const allCategories = getAllCategoriesFlat();
//   const mainCategories = allCategories.filter((cat) => !cat.isSubcategory);
//   const subcategories = allCategories.filter(
//     (cat) => cat.isSubcategory && cat.parentId === formData.category
//   );

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleContentChange = (content) => {
//     setFormData((prev) => ({ ...prev, content }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImageFile(file);

//       // Create preview
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCategoryChange = (e) => {
//     const categoryId = e.target.value;
//     setFormData((prev) => ({
//       ...prev,
//       category: categoryId,
//       subcategory: "", // Reset subcategory when category changes
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validate form
//     if (!formData.title.trim()) {
//       setError("El título es obligatorio");
//       return;
//     }

//     if (!formData.content.trim()) {
//       setError("El contenido es obligatorio");
//       return;
//     }

//     if (!formData.category) {
//       setError("Debes seleccionar una categoría");
//       return;
//     }

//     try {
//       setIsSubmitting(true);
//       setError("");

//       let imageUrl = "";

//       // Upload image if provided
//       if (imageFile) {
//         const fileName = `${Date.now()}-${imageFile.name}`;
//         imageUrl = await uploadImage(imageFile, fileName);
//       }

//       // Create article
//       const articleData = {
//         ...formData,
//         imageUrl,
//       };

//       const newArticle = await createArticle(articleData);

//       toast.success("Artículo creado correctamente");
//       navigate(`/admin/articulos`);
//     } catch (err) {
//       console.error("Error creating article:", err);
//       setError("Error al crear el artículo. Por favor intenta de nuevo.");
//       toast.error("Error al crear el artículo");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Quill editor modules and formats
//   const modules = {
//     toolbar: [
//       [{ header: [1, 2, 3, 4, 5, 6, false] }],
//       ["bold", "italic", "underline", "strike"],
//       [{ list: "ordered" }, { list: "bullet" }],
//       [{ indent: "-1" }, { indent: "+1" }],
//       [{ align: [] }],
//       ["link", "image", "video"], // 👈 Agregamos la opción de video
//       ["clean"],
//     ],
//   };

//   const formats = [
//     "header",
//     "bold",
//     "italic",
//     "underline",
//     "strike",
//     "list",
//     "bullet",
//     "indent",
//     "link",
//     "image",
//     "align",
//     "video", // 👈 Agregamos video
//   ];

//   return (
//     <>
//       <Helmet>
//         <title>Crear Artículo - Portal de Noticias</title>
//       </Helmet>

//       <div>
//         <style>
//           {`
//             .ql-editor iframe {
//               width: 80% !important;
//               height: 400px !important;
//               border-radius: 10px; 
//               display: block; 
//               margin-left: auto; 
//               margin-right: auto;
//             }
//           `}
//         </style>

//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-2xl font-bold">Crear Artículo</h1>
//           <button
//             onClick={() => navigate("/admin/articulos")}
//             className="btn btn-outline"
//           >
//             Cancelar
//           </button>
//         </div>

//         {error && (
//           <div className="bg-red-50 text-red-600 p-4 rounded-md mb-6">
//             {error}
//           </div>
//         )}

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-lg shadow-md p-6"
//         >
//           {/* Title */}
//           <div className="mb-4">
//             <label htmlFor="title" className="label">
//               Título *
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               className="input"
//               placeholder="Título del artículo"
//               disabled={isSubmitting}
//             />
//           </div>

//           {/* Category and Subcategory */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//             <div>
//               <label htmlFor="category" className="label">
//                 Categoría *
//               </label>
//               <select
//                 id="category"
//                 name="category"
//                 value={formData.category}
//                 onChange={handleCategoryChange}
//                 className="input"
//                 disabled={isSubmitting}
//               >
//                 <option value="">Seleccionar categoría</option>
//                 {mainCategories.map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label htmlFor="subcategory" className="label">
//                 Subcategoría
//               </label>
//               <select
//                 id="subcategory"
//                 name="subcategory"
//                 value={formData.subcategory}
//                 onChange={handleChange}
//                 className="input"
//                 disabled={isSubmitting || !formData.category}
//               >
//                 <option value="">Seleccionar subcategoría</option>
//                 {subcategories.map((subcategory) => (
//                   <option key={subcategory.id} value={subcategory.id}>
//                     {subcategory.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//           </div>

//           {/* Featured and Auto-delete */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="featured"
//                 name="featured"
//                 checked={formData.featured}
//                 onChange={handleChange}
//                 className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//                 disabled={isSubmitting}
//               />
//               <label
//                 htmlFor="featured"
//                 className="ml-2 block text-sm text-gray-900"
//               >
//                 Marcar como destacado
//               </label>
//             </div>

//             <div className="flex items-center">
//               <input
//                 type="checkbox"
//                 id="autoDelete"
//                 name="autoDelete"
//                 checked={formData.autoDelete}
//                 onChange={handleChange}
//                 className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
//                 disabled={isSubmitting}
//               />
//               <label
//                 htmlFor="autoDelete"
//                 className="ml-2 block text-sm text-gray-900"
//               >
//                 Auto-eliminar después de 30 días
//               </label>
//             </div>
//           </div>

//           {/* Image Upload */}
//           <div className="mb-6">
//             <label className="label">Imagen</label>
//             <div className="flex items-center space-x-4">
//               <button
//                 type="button"
//                 onClick={() => fileInputRef.current.click()}
//                 className="btn btn-outline"
//                 disabled={isSubmitting}
//               >
//                 Seleccionar imagen
//               </button>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 onChange={handleImageChange}
//                 accept="image/*"
//                 className="hidden"
//                 disabled={isSubmitting}
//               />
//               <span className="text-sm text-gray-500">
//                 {imageFile ? imageFile.name : "Ninguna imagen seleccionada"}
//               </span>
//             </div>

//             {imagePreview && (
//               <div className="mt-4">
//                 <img
//                   src={imagePreview}
//                   alt="Vista previa"
//                   className="max-h-64 rounded-md"
//                 />
//               </div>
//             )}
//           </div>

//           {/* Content Editor */}
//           <div className="mb-6">
//             <label htmlFor="content" className="label">
//               Contenido *
//             </label>
//             <ReactQuill
//               theme="snow"
//               value={formData.content}
//               onChange={handleContentChange}
//               modules={modules}
//               formats={formats}
//               placeholder="Escribe el contenido del artículo aquí..."
//               className="bg-white"
//               readOnly={isSubmitting}
//             />
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="btn btn-primary"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? (
//                 <span className="flex items-center">
//                   <LoadingSpinner size="sm" />
//                   <span className="ml-2">Guardando...</span>
//                 </span>
//               ) : (
//                 "Publicar Artículo"
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default CreateArticle;













import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createArticle, uploadImage } from "../../services/articleService";
import { getAllCategoriesFlat } from "../../utils/categories";
import LoadingSpinner from "../../components/ui/LoadingSpinner";
import toast from "react-hot-toast";

const CreateArticle = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    subcategory: "",
    featured: false,
    autoDelete: false,
    is_complementary: false, // Nuevo campo
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Get all categories and subcategories
  const allCategories = getAllCategoriesFlat();
  const mainCategories = allCategories.filter((cat) => !cat.isSubcategory);
  const subcategories = allCategories.filter(
    (cat) => cat.isSubcategory && cat.parentId === formData.category
  );

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

  const handleCategoryChange = (e) => {
    const categoryId = e.target.value;
    setFormData((prev) => ({
      ...prev,
      category: categoryId,
      subcategory: "", // Reset subcategory when category changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
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

      // Upload image if provided
      if (imageFile) {
        const fileName = `${Date.now()}-${imageFile.name}`;
        imageUrl = await uploadImage(imageFile, fileName);
      }

      // Create article
      const articleData = {
        ...formData,
        imageUrl,
      };

      const newArticle = await createArticle(articleData);

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

  // Quill editor modules and formats
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
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
  ];

  return (
    <>
      <Helmet>
        <title>Crear Artículo - Portal de Noticias</title>
      </Helmet>

      <div>
        <style>
          {`
            .ql-editor iframe {
              width: 80% !important;
              height: 400px !important;
              border-radius: 10px; 
              display: block; 
              margin-left: auto; 
              margin-right: auto;
            }
          `}
        </style>

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
            </div>

            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Vista previa"
                  className="max-h-64 rounded-md"
                />
              </div>
            )}
          </div>

          {/* Content Editor */}
          <div className="mb-6">
            <label htmlFor="content" className="label">
              Contenido *
            </label>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={handleContentChange}
              modules={modules}
              formats={formats}
              placeholder="Escribe el contenido del artículo aquí..."
              className="bg-white"
              readOnly={isSubmitting}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
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
      </div>
    </>
  );
};

export default CreateArticle;
"use client";
import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";

const CrearProducto = () => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    image: [""],
    category: "",
    rating: "",
    stock: "",
    description: "",
    material: "",
    size: "",
    finish: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.image];
    newImages[index] = value;
    setFormData({ ...formData, image: newImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, image: [...formData.image, ""] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario, por ejemplo, enviarlo a tu backend
    console.log("Producto creado:", formData);
    toast.success(formData.title.toUpperCase() + " creado exitosamente");
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Crear Nuevo Producto</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Título</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-double focus:bg-white focus:border-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="">
          <label className="block text-sm  font-medium">Precio $</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className=" border rounded p-2 w-full focus:outline-double focus:bg-white focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-double focus:bg-white focus:border-blue-500"
          />
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Imágenes</label>
            <input
              type="file"
              multiple
              onChange={handleImageChange}
              className="w-full border rounded p-2 focus:outline-double focus:bg-white focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Categoría</label>
            <select
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-double focus:bg-white focus:border-blue-500"
            >
              <option value="utensilios">Utensilios</option>
              <option value="muebles">Muebles</option>
              <option value="juguetes">Juguetes</option>
              <option value="accesorios">Accesorios</option>
            </select>
          </div>
       
    
        </div>
        <div>
          <label className="block text-sm font-medium">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded p-2 focus:outline-double focus:bg-white focus:border-blue-500"
          />
        </div>
        <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="">
            <label className="block text-sm font-medium">Material</label>
            <select
              type="text"
              name="material"
              value={formData.material}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-double focus:bg-white focus:border-blue-500"
            >
              <option value="madera">Madera</option>
              <option value="metal">Cuero</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Tamaño</label>
            <select
              type="text"
              name="size"
              value={formData.size}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-double focus:bg-white focus:border-blue-500"
            >
              <option value="Chico">Chico</option>
              <option value="mediano">Mediano</option>
              <option value="grande">Grande</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium">Acabado</label>
            <select
              type="text"
              name="finish"
              value={formData.finish}
              onChange={handleChange}
              className="w-full border rounded p-2 focus:outline-double focus:bg-white focus:border-blue-500"
            >
              <option value="natural">Natural</option>
              <option value="lacado">Lacado</option>
              <option value="pintado">Pintado</option>
              <option value="barnizado">Barnizado</option>
              <option value="otro">otro</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-700 rounded px-4 py-2"
        >
          Crear Producto
        </button>
      </form>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
};

export default CrearProducto;

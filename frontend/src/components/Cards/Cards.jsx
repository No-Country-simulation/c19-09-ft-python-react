"use client";

import Card from "../Card/Card";

const Cards = (props) => {
  const { products } = props;

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {products.map((e) => (
        <Card
          key={e._id}
          _id={e._id}
          image={e.image}
          title={e.title}
          price={e.price}
          stock={e.stock}
          category={e.category} // Asegúrate de verificar también si category es undefined
        />
      ))}
    </div>
  );
};

export default Cards;

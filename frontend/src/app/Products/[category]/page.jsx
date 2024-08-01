"use client";
import { data } from "../../../../public/data";
import Products from "../../../components/Products/Products";

const page = ({ params }) => {
  const { category } = params;

  return (
    <div className="p-10 md:px-4 mt-20  ">
      <Products category={category} data={data} />
    </div>
  );
};

export default page;

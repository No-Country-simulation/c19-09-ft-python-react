import React, { Suspense } from "react";
import Search from "../../components/Search/Search"; // Asegúrate de que la ruta sea correcta

const SearchPage = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <Search />
  </Suspense>
);

export default SearchPage;

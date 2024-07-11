import React from 'react'

const Buscador = ({handleSearch}) => {
  return (
    <div className="flex justify-center w-full">
        <div className="text-center">
        <form>
          <input
            onChange={handleSearch}
            type="search"
            placeholder="Buscar..."
            className=" bg-white-500 border-solid border  rounded-md w-[15em] h-[2em] text-center focus:ring-4 focus:outline-none focus:ring-primary"
          />
          
        </form>
      </div>
    </div>
  )
}

export default Buscador
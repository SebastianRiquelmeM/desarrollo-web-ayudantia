import React from 'react'

export const Lista = () => {

     const lista = ["Elemento1", "Elemento2", "Elemento3", "Elemento4"];

     return (
          <div>
               <h1>Lista de elementos:</h1>
               <ul>
                    {
                         lista.map( (elemento, indice) => {
                              return (
                                   <li key={indice}>
                                        {elemento}
                                   </li>
                              );
                         })
                    }
               </ul>
          </div>
     )
}

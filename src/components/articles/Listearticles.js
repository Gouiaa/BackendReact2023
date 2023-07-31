import React, {useCallback, useEffect, useState}  from 'react'
import { useDispatch } from "react-redux"; // je veux dispatch une action : trés intéressant : lancer une méthode 
import Affichearticles from './Affichearticles';
import { getArticlespages } from '../../features/articleSlice';


const Listearticles = () => {
  const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 12;
//const indexOfLastItem = currentPage * itemsPerPage;
//const indexOfFirstItem = indexOfLastItem - itemsPerPage;

const dispatch=useDispatch()
const Listearticles= useCallback(()=>{
const mesParams={
currentPage:currentPage,
itemsPerPage:itemsPerPage
};
dispatch(getArticlespages(mesParams))
},
[currentPage])
useEffect(() => {
Listearticles()
}, [Listearticles])
  return (
    <div>
      <Affichearticles currentPage={currentPage} setCurrentPage={setCurrentPage} itemsPerPage = {itemsPerPage}/>
    </div>
  )
}

export default Listearticles

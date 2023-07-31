import Api from '../Axios/Api'

const CATEGORIE_API='/categories'

export const fetchCategorie = async ()=>{
    return await Api.get(CATEGORIE_API);
}
export const fetchCategorieById = async(categorieID)=>{
    return await Api.get(CATEGORIE_API+'/'+categorieID);
}
export const addCategorie = async(categorie) => {
    return await Api.post(CATEGORIE_API, categorie);   
}
export const deleteCategorie = async (categorieID) =>{
    return await Api.delete(CATEGORIE_API+'/'+categorieID);
}

export const editCategorie = async(categorie) =>{
    return await Api.put(CATEGORIE_API+'/'+categorie._id,categorie);

}
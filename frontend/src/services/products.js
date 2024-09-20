import config from "../config/config";

export const getProducts = async (model = "") => {
    try {

        const res = await fetch(`${config.backAPI}/products${model && `/${model}`}`)

        if (!res.ok) throw 'Hubo un error obteniendo los productos'
        const json = await res.json();
        let prods = json.payload

        if (!Array.isArray(prods)) {
            prods = [prods];
        }

        return prods.map(p => {
            return {
                ...p,
                id: p.id || '',
                descripcion: p.descripcion,
                altura: p.altura,
                garantia: p.garantia,
                medidas: p.medidas,
                modelo: p.modelo,
                nucleo: p.nucleo,
                peso: p.peso,
                tela: p.tela,
                thumbnails: p.thumbnails.map(t => `${config.backURL + t}`)
            }
        })
    } catch (error) {
        throw new Error(error);
    }
}

// export const addProduct = async model =>{

// }

export const deleteProduct = async id => {
    const res = await fetch(`${config.backAPI}/products/${id}`, {
        method: "DELETE",
        credentials: "include",
    });
    return res.ok;
}

// Normaliza un string: quita acentos y lo pasa a minúsculas
export const normalizeString = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
};
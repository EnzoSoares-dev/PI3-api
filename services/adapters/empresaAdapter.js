export const empresaAdapter = (empresa) => {
    return {
        id: empresa.id,
        nome: empresa.name,
        email: empresa.email
    }
}
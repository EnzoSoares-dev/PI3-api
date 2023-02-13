export const processoAdapter = (processos)=>{
    const adapter = []
    const updateProcesso = processos.map((processo)=>{
        const{dataValues} = processo
        adapter.push({
            id: dataValues.id,
            name: dataValues.name,
            steps: dataValues.steps,
            description: dataValues.description,
            end_date: dataValues.end_date
        })

    })
    return adapter
}
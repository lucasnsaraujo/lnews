import { NextApiRequest, NextApiResponse } from 'next'

export default (request: NextApiRequest, response: NextApiResponse) => {

    console.log(request.query)
    
    const users = [
        {
            id: 1,
            name: 'Lucas'
        },
        {
            id: 2,
            name: 'André'
        },
        {
            id: 3,
            name: 'Marcelo'
        },
    ]
    return response.json(users)
}
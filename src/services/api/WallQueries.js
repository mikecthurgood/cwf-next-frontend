import post from './Request';

const getWalls = async () => {
    const graphqlQuery = { query: `
        {
            walls {
                walls {
                    id
                    name
                    description
                    weekdayOpening
                    weekdayClosing
                    weekendOpening
                    weekendClosing
                    openingNotes
                    websiteUrl
                    imageUrl
                    boulderingOnly
                    addressLine1
                    addressLine2
                    addressLine3
                    city
                    region
                    postcode
                    slug
                    auto
                    top
                    lead
                    gym
                    cafe
                    reviews {
                        rating
                      }
                }
                loggedIn
            }
        }
    `}
    const walls = await post(graphqlQuery)
    return walls
}
const getWallsWithDistance = async (postcode) => {
    const graphqlQuery = { 
        query: `
            query GetWallsWithDistance($postcode: String!) {
                    wallsWithDistance(postcode: $postcode) {
                        walls {
                            id
                            name
                            description
                            weekdayOpening
                            weekdayClosing
                            weekendOpening
                            weekendClosing
                            openingNotes
                            websiteUrl
                            imageUrl
                            boulderingOnly
                            addressLine1
                            addressLine2
                            addressLine3
                            city
                            region
                            postcode
                            slug
                            auto
                            top
                            lead
                            gym
                            cafe
                            distance
                            reviews {
                                rating
                            }
                        }
                        loggedIn
                    }
                }
            `,
            variables: {
                postcode: postcode
            }}
    const walls = await post(graphqlQuery)
    return walls
}

export default {
    getWallsWithDistance,
    getWalls,
}

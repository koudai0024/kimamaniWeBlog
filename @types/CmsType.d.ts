type BlogsTypes = {
    contents?: Array<Blog>,
    totalCount?: number,
    offset?: number,
    limit?: number 
}

type BlogTypes = {
    id: string,
    createdAt?: string,
    updatedAt?: string,
    publishedAt?: string,
    revisedAt?: string,
    title: string,
    thumbnail?: {
        url?: string
    },
    excerpt?: string,
    body?: string,
    tags?: Array<{
        id: string,
        createdAt?: string,
        updatedAt?: string,
        publishedAt?: string,
        revisedAt?: string,
        name?: string
    }>
}

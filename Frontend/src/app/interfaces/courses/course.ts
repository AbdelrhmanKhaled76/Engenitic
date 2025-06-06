export interface Course {
    id: number
    title: string
    code: string
    description: string
    instructorName: string
    instructorEmail ?: string
    instructorPhone ?: string
    requirements ?: string
    image: Image
}

export interface Image {
    name: string
    imageURL: string
    hash : number
}

// posts.json.js
export const get = async () => {
    // glob is a Vite function that will, in this case, import all .md files
    // in blog directory
    // it returns an object with each files path as key and value is a 
    // function that loads the file contents as JS promise
    const allPostFiles =
        import.meta.glob('../blog/*.md')
    const iterablePostFiles = Object.entries(allPostFiles)

    const allPosts = await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const {
                metadata
            } = await resolver()
            const postPath = path.slice(2, -3)

            return {
                meta: metadata,
                path: postPath,
            }
        })
    )

    const sortedPosts = allPosts.sort((a, b) => {
        // return new Date(b.meta.date) - new Date(a.meta.date)
        return (b.meta.date) - (a.meta.date)
    })

    return {
        body: sortedPosts
    }
}
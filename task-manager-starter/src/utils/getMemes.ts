function importAll(r: __WebpackModuleApi.RequireContext) {
    return r.keys().map(fileName => ({
        name: `Meme ${fileName.replace('./', '').replace(/\.(png|jpg|webp)$/, '')}`,
        image: `/memes/${fileName.replace('./', '')}`
    }));
}

export function getMemes() {
    try {
        // This will get all image files from the public/memes directory
        const memes = importAll(require.context('../../public/memes', false, /\.(png|jpg|webp)$/));
        return memes;
    } catch (error) {
        console.error('Error loading memes:', error);
        return [];
    }
}
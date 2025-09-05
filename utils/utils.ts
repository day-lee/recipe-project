export const extractVideoId = (url:string) => {
    const urlObj = new URL(url);
    return urlObj.pathname.slice(1)
}
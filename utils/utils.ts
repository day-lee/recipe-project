export const extractVideoId = (url: string): string | null => {
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:.*v=|v\/|embed\/))([^#&?]*).*/;
    const match = url.match(regExp);
    const youtubeVideoIdLength = 11;
    return match && match[1].length === youtubeVideoIdLength ? match[1] : null;
  };

  export const nameFormatter = (str: string) => {
    const trimmed = str.trim();
    if (!trimmed) return '';
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase()
  }
import parse from 'html-react-parser';
import { Element } from 'html-react-parser';

export const formatContent : any = (content: string, maxLength:number) =>{
    return content.length > maxLength? content.substring(0, maxLength) +"...": content;
}

export const stripHtmlTags = (html: string) => {
    if (!html) return '';
    return html.replace(/<[^>]*>/g, '');
  };
  export const getFirstImage = (html: string): string | null => {
    const doc = new DOMParser().parseFromString(html, 'text/html'); // Chuyển chuỗi HTML thành DOM
  
    const img = doc.querySelector('img'); // Tìm thẻ <img> đầu tiên
  
    return img ? img.getAttribute('src') : "https://via.placeholder.com/100x100"; // Trả về thuộc tính 'src' nếu tìm thấy, nếu không trả về null
  };
  
  

export const removeImages = (html: string) => {
    return parse(html, {
      replace: (domNode) => {
        if (domNode instanceof Element && domNode.name === 'img') {
          return null; // Loại bỏ thẻ img
        }
      }
    });
};

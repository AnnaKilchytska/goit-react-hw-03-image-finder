import axios from 'axios';

const requestImages = async (imagerequest, page) => {
  const data = await axios.get(
    `https://pixabay.com/api/?q=${imagerequest}&page=${page}&key=32875343-08825ac1bb88acf5968fba766&image_type=photo&orientation=horizontal&per_page=12`
  );
  console.log(data);
  return data;
};

export default requestImages;

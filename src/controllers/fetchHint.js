import axios from 'axios';

export const fetchHint = async (word) => {
  try {
    const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    return data[0]?.meanings[0]?.definitions[0]?.definition || 'No hint available';
  } catch {
    return 'No hint available';
  }
};

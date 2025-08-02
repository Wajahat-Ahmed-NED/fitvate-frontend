// import axios from 'axios';
// import { TranslationDTO } from '../types';

// const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY; // Store in env file in real projects


// export async function translateArticle(translationDTO: TranslationDTO): Promise<TranslationDTO | null> {
//   const { title, body, languagetotranslateto } = translationDTO;

//   const systemPrompt = `You are a translator. Translate the given article to ${languagetotranslateto}. Return a JSON object with the same keys and translated values.`;

//   const userMessage = {
//     title,
//     body,
//     languagetotranslateto
//   };

//   try {
//     const res = await axios.post(
//       'https://api.openai.com/v1/chat/completions',
//       {
//         model: "gpt-3.5-turbo", 
//         messages: [
//           { role: 'system', content: systemPrompt },
//           { role: 'user', content: JSON.stringify(userMessage) }
//         ],
//         temperature: 0,
//         top_p: 1,
//         n: 1,
//         stream: false,
//         max_tokens: 4096,
//         presence_penalty: 0,
//         frequency_penalty: 0
//       },
//       {
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${OPENAI_API_KEY}`
//         }
//       }
//     );

//     // Extract and parse response
//     const assistantMessage = res.data.choices[0].message.content;
//     const translated = JSON.parse(assistantMessage);

//     return translated;
//   } catch (error) {
//     console.error('Translation error:', error);
//     return null;
//   }
// }

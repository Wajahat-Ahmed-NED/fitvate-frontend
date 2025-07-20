import axios from 'axios';
import { User, Language, Article } from '../types';

const api = import.meta.env.VITE_fitvateBackend as string;
const adminToken = import.meta.env.VITE_adminToken as string;

// Define interfaces
interface ToggleBlockParams {
  blockStatus: boolean;
  userId: string;
}

// ================================
// USER MANAGEMENT
// ================================

async function listUsers(pageNo: number) {
  return await axios.get(`${api}/admin/getUsers?page=${pageNo}&role=user`, {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  });
}

async function userProfileById(userId: string) {
  return await axios.get(`${api}/admin/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  });
}

async function updateProfile(user: User) {
  const { id, name, profilePic, dateofBirth:dateOfBirth, gender, height, weight, provider } = user;
  return await axios.put(
    `${api}/admin/user/${id}`,
    { name, profilePic, dateOfBirth, gender, height, weight, provider },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    }
  );
}

async function deleteProfile(user: User) {
  return await axios.delete(`${api}/admin/user/${user.id}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  });
}

async function toggleBlock({ blockStatus, userId }: ToggleBlockParams) {
  return await axios.put(
    `${api}/admin/user/${userId}/block`,
    { blocked: blockStatus },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`
      }
    }
  );
}

async function getPurchases(userId: string) {
  return await axios.get(`${api}/admin/user/${userId}/getPurchases`, {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  });
}


// ================================
// DASHBOARD
// ================================

async function dailyActiveUsers(){
  return await axios.get(`${api}/admin/analytics/dailyActiveUsers`, {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  });
}

async function dailyNewUsers(){
  return await axios.get(`${api}/admin/analytics/dailyNewUsers`, {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  });
}

// ================================
// ARTICLE LANGUAGES
// ================================

async function getAllLanguages(){
  return await axios.get(`${api}/admin/language/getAll`, {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  });
}

async function addLanguage(language: Language){
  return await axios.post(`${api}/admin/language/add`,  
  {
    locale: language.locale,
    language: language.language
  },
  {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  });
}

async function editLanguage(language: Language){
  return await axios.put(`${api}/admin/language/edit/${language.id}`,  
  {
    locale: language.locale,
    language: language.language
  },
  {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  });
}

async function deleteLanguage(language: Language){
  return await axios.delete(`${api}/admin/language/delete/${language.id}`, 
  {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  });
}

async function changeArticleStatus(article: Article){
  return await axios.put(`${api}/admin/article/changeStatus`,  
  {
    id: article.id,
    status: article.status
  },
  {
    headers: {
      Authorization: `Bearer ${adminToken}`
    }
  });
}



export {
  listUsers,
  userProfileById,
  updateProfile,
  deleteProfile,
  toggleBlock,
  getPurchases,
  dailyActiveUsers,
  dailyNewUsers,
  getAllLanguages,
  addLanguage,
  editLanguage,
  deleteLanguage,
  changeArticleStatus
};

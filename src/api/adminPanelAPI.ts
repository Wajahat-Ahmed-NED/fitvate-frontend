import axios from "axios";
import { User, Language, Article } from "../types";

const api = "http://3.27.12.144:5000";
// const adminToken = import.meta.env.VITE_adminToken as string;
const userId = import.meta.env.VITE_userId as string;

// Define interfaces
interface ToggleBlockParams {
  blockStatus: boolean;
  userId: string;
}

interface AdminLoginDTO {
  email: string;
  password: string;
  role: string;
}

// ================================
// ADMIN AUTH
// ================================

async function adminLogin(adminAuth: AdminLoginDTO) {
  return await axios.post(`${api}/auth/login`, adminAuth);
}

// ================================
// USER MANAGEMENT
// ================================

async function listUsers(pageNo: number, adminToken: string | null) {
  return await axios.get(`${api}/admin/getUsers?page=${pageNo}&role=user`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}

async function userProfileById(userId: string, adminToken: string | null) {
  return await axios.get(`${api}/admin/user/${userId}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}

async function updateProfile(user: User, adminToken: string | null) {
  const {
    id,
    name,
    profilePic,
    dateofBirth: dateOfBirth,
    gender,
    height,
    weight,
    provider,
  } = user;
  return await axios.put(
    `${api}/admin/user/${id}`,
    { name, profilePic, dateOfBirth, gender, height, weight, provider },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
}

async function deleteProfile(user: User, adminToken: string | null) {
  return await axios.delete(`${api}/admin/user/${user.id}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}

async function toggleBlock(
  { blockStatus, userId }: ToggleBlockParams,
  adminToken: string | null
) {
  return await axios.put(
    `${api}/admin/user/${userId}/block`,
    { blocked: blockStatus },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
}

async function getPurchases(userId: string, adminToken: string | null) {
  return await axios.get(`${api}/admin/user/${userId}/getPurchases`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}

// ================================
// DASHBOARD
// ================================

async function dailyActiveUsers(adminToken: string | null) {
  return await axios.get(`${api}/admin/analytics/dailyActiveUsers`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}

async function dailyNewUsers(adminToken: string | null) {
  return await axios.get(`${api}/admin/analytics/dailyNewUsers`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}

// ================================
// ARTICLE LANGUAGES
// ================================

async function getAllLanguages(adminToken: string | null) {
  return await axios.get(`${api}/admin/language/getAll`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}

async function addLanguage(language: Language, adminToken: string | null) {
  return await axios.post(
    `${api}/admin/language/add`,
    {
      locale: language.locale,
      language: language.language,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
}

async function editLanguage(language: Language, adminToken: string | null) {
  return await axios.put(
    `${api}/admin/language/edit/${language.id}`,
    {
      locale: language.locale,
      language: language.language,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
}

async function deleteLanguage(language: Language, adminToken: string | null) {
  return await axios.delete(`${api}/admin/language/delete/${language.id}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}

async function changeArticleStatus(
  article: Article,
  adminToken: string | null
) {
  return await axios.put(
    `${api}/admin/article/changeStatus`,
    {
      id: article.id,
      status: article.status,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
}

// ================================
// ARTICLES
// ================================

async function getArticles(adminToken: string | null) {
  return await axios.get(`${api}/users/${userId}/posts?locale=en&pageSize=8`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}

async function getSingleArticle(article: Article, adminToken: string | null) {
  return await axios.get(`${api}/users/${userId}/posts/${article.id}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}

async function createArticle(
  article: Partial<Article>,
  adminToken: string | null
) {
  return await axios.post(
    `${api}/users/${userId}/posts`,
    {
      title: article.title,
      body: article.body,
      imageUrl: article.imageUrl,
      type: article.type,
      topic: article.topic,
      locale: article.locale,
      category: article.category,
      source: article.source,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
}

async function updateArticle(
  article: Partial<Article>,
  adminToken: string | null
) {
  return await axios.put(
    `${api}/users/${userId}/posts/${article.id}`,
    {
      title: article.title,
      body: article.body,
      imageUrl: article.imageUrl,
      type: article.type,
      topic: article.topic,
      locale: article.locale,
      category: article.category,
      source: article.source,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
}

async function deleteArticle(article: Article, adminToken: string | null) {
  return await axios.delete(`${api}/users/${userId}/posts/${article.id}`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}

async function getLikedArticle(article: Article, adminToken: string | null) {
  return await axios.get(`${api}/users/${userId}/liked-articles`, {
    headers: {
      Authorization: `Bearer ${adminToken}`,
    },
  });
}

async function addLikedArticle(article: Article, adminToken: string | null) {
  return await axios.post(
    `${api}/users/${userId}/liked-articles`,
    {
      articleId: article.id,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
}

async function deleteLikedArticle(article: Article, adminToken: string | null) {
  return await axios.post(
    `${api}/users/${userId}/liked-articles`,
    {
      articleId: article.id,
    },
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
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
  changeArticleStatus,
  getArticles,
  getLikedArticle,
  getSingleArticle,
  deleteArticle,
  deleteLikedArticle,
  createArticle,
  updateArticle,
  addLikedArticle,
  adminLogin,
};

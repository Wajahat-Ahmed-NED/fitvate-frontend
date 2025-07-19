import axios from 'axios';
import { User } from '../types';

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

async function deleteProfile(userId: string) {
  return await axios.delete(`${api}/admin/user/${userId}`, {
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

export {
  listUsers,
  userProfileById,
  updateProfile,
  deleteProfile,
  toggleBlock,
  getPurchases
};

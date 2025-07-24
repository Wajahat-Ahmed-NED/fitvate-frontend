import React, { useState, useEffect, useMemo } from 'react';
import { Search, Filter, Edit, Trash2, Ban, CheckCircle, Eye } from 'lucide-react';
import { User } from '../../types';
import { UserModal } from './UserModal';
import { clsx } from 'clsx';
import { deleteProfile, listUsers, toggleBlock } from '../../api/adminPanelAPI';
import Swal from 'sweetalert2';
import { debounce } from 'lodash';
import { useAtomValue } from 'jotai';
import { authTokenAtom } from '../../store/auth';

export const UserManagement: React.FC = () => {
  const adminToken = useAtomValue(authTokenAtom);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');
  const [allUsers, setAllUsers] = useState<User[]>([]); 
  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers(1);
  }, [pagination.page]);

  const handleRefresh = () => {
    fetchUsers(1);
  }

  const debouncedFilter = useMemo(
  () =>
    debounce((text: string) => {
        const filtered = allUsers.filter((user) =>
          user.name.toLowerCase().includes(text.toLowerCase())
        );
        setUsers(filtered);
      }, 300),
    [allUsers]
  );

  useEffect(() => {
    debouncedFilter(searchTerm);
    return () => {
      debouncedFilter.cancel();
    };
  }, [searchTerm, debouncedFilter]);

  const fetchUsers = async (page: number) => {
    try {
      setLoading(true);
      const response = await listUsers(page,adminToken);
      console.log(response)
      setAllUsers(response?.data?.data);
      setUsers(response?.data?.data); 
      setPagination(response?.data?.pagination);
    } catch (error) {
      console.error('Error fetching users:', error);
      // setUsers([
      //   {
      //     id: "eb783c26-c093-47ae-832b-73a874ac4541",
      //     name: "Rahul verma",
      //     email: "dsfs@gmail.com",
      //     password: null,
      //     role: "user",
      //     blocked: false,
      //     profilePic: "sdgfdddd",
      //     mobileNumber: "+918979342290",
      //     dateofBirth: null,
      //     gender: "madfle",
      //     height: "gdgdfg",
      //     weight: "dsfdgdfg",
      //     provider: null,
      //     fcm_token: "dfgdxgxcgc",
      //     googleId: null,
      //     facebookId: null,
      //     createdAt: "2025-07-05T00:00:00.000Z"
      //   }
      // ])
      let errorMessage = 'Unknown error occurred';
      if (error instanceof Error) {
        errorMessage = error.message;
      }

      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        timer:5000,
        icon: 'error',
        width: '300px',
        padding: '1rem',
        customClass: {
          popup: 'p-4 rounded-md shadow-md', 
          title: 'text-lg font-semibold',   
          htmlContainer: 'text-sm',       
          confirmButton: 'bg-blue-600 shadow-lg hover:bg-blue-700 text-white px-4 py-2 rounded', 
        },
        confirmButtonText: 'Okay',
        buttonsStyling: false, // required to use Tailwind styles
      });
    } finally {
      setLoading(false);
    }
  };

  const handleViewUser = (user: User) => {
    setSelectedUser(user);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    deleteProfile(user,adminToken).then((res) => {
      if (res?.status == 200) {
        Swal.fire({
          title: 'Success!',
          text: `${res?.data?.message}`,
          timer: 5000,
          icon: 'success',
          width: '300px',
          padding: '1rem',
          customClass: {
            popup: 'p-4 rounded-md shadow-md',
            title: 'text-lg font-semibold',
            htmlContainer: 'text-sm',
            confirmButton: 'bg-blue-600 shadow-lg hover:bg-blue-700 text-white px-4 py-2 rounded',
          },
          confirmButtonText: 'Okay',
          buttonsStyling: false, // required to use Tailwind styles
        })
      }
      fetchUsers(pagination.page);
    }).catch((err) => {
      Swal.fire({
        title: 'Error!',
        text: `${err?.data?.message}`,
        timer: 5000,
        icon: 'error',
        width: '300px',
        padding: '1rem',
        customClass: {
          popup: 'p-4 rounded-md shadow-md',
          title: 'text-lg font-semibold',
          htmlContainer: 'text-sm',
          confirmButton: 'bg-blue-600 shadow-lg hover:bg-blue-700 text-white px-4 py-2 rounded',
        },
        confirmButtonText: 'Okay',
        buttonsStyling: false, // required to use Tailwind styles
      })
    });
  };
  
  const handleBlockUser = (user: User) => {
    toggleBlock({
      blockStatus: !user.blocked,
      userId: user.id,
    },adminToken).then((res)=>{
      if(res?.status==200){
        Swal.fire({
        title: 'Success!',
        text: `${res?.data?.message}`,
        timer: 5000,
        icon: 'success',
        width: '300px',
        padding: '1rem',
        customClass: {
          popup: 'p-4 rounded-md shadow-md', 
          title: 'text-lg font-semibold',   
          htmlContainer: 'text-sm',       
          confirmButton: 'bg-blue-600 shadow-lg hover:bg-blue-700 text-white px-4 py-2 rounded', 
        },
        confirmButtonText: 'Okay',
        buttonsStyling: false, // required to use Tailwind styles
        });
        handleRefresh();
      }
    }).catch((err)=>{
        Swal.fire({
        title: 'Error!',
        text: `${err?.data?.message}`,
        timer: 5000,
        icon: 'error',
        width: '300px',
        padding: '1rem',
        customClass: {
          popup: 'p-4 rounded-md shadow-md', 
          title: 'text-lg font-semibold',   
          htmlContainer: 'text-sm',       
          confirmButton: 'bg-blue-600 shadow-lg hover:bg-blue-700 text-white px-4 py-2 rounded', 
        },
        confirmButtonText: 'Okay',
        buttonsStyling: false, // required to use Tailwind styles
      })
    })
  };

  // const handleCreateUser = () => {
  //   setSelectedUser(null);
  //   setModalMode('create');
  //   setIsModalOpen(true);
  // };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
        {/* <button
          onClick={handleCreateUser}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add User</span>
        </button> */}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>
          {loading ? 
            <div className="shadow rounded-md p-4 w-full">
              <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-gray-400 h-12 w-12"></div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-400 rounded"></div>
                    <div className="h-4 bg-gray-400 rounded"></div>
                  </div>
                </div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-400 rounded"></div>
                    <div className="h-4 bg-gray-400 rounded"></div>
                  </div>
                </div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-400 rounded"></div>
                    <div className="h-4 bg-gray-400 rounded"></div>
                  </div>
                </div>
                <div className="flex-1 space-y-4 py-1">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-400 rounded"></div>
                    <div className="h-4 bg-gray-400 rounded"></div>
                  </div>
                </div>
              </div>
            </div> :
            <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Gender
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                {users && 
                <tbody className="bg-white divide-y divide-gray-200">
                  {users?.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                            <span className="text-white font-medium">
                              {user.name[0]}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={clsx(
                          'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                          user.blocked
                            ? 'bg-red-100 text-red-800'
                            : 'bg-green-100 text-green-800'
                        )}>
                          {user.blocked ? 'Blocked' : 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={clsx(
                          'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                          user.role
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        )}>
                          {user.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.gender}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewUser(user)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                            title='View User'
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-gray-600 hover:text-gray-900 p-1 rounded transition-colors"
                            title='Edit User'
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteUser(user)} className="text-red-600 hover:text-red-900 p-1 rounded transition-colors" title='Delete User'>
                            <Trash2 className="w-4 h-4" />
                          </button>
                          <button 
                            className="text-orange-600 hover:text-orange-900 p-1 rounded transition-colors"
                            title={user.blocked ? "Unblock User" : "Block User"}
                            onClick={() => handleBlockUser(user)}
                          >
                            {user.blocked ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                }
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <button
                disabled={pagination.page === 1}
                onClick={() => fetchUsers(pagination.page - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                title='Go to previous page'
              >
                Previous
              </button>

              <span className="text-sm">
                Page {pagination.page} of {Math.ceil(pagination.total / pagination.limit)}
              </span>

              <button
                disabled={pagination.page >= Math.ceil(pagination.total / pagination.limit)}
                onClick={() => fetchUsers(pagination.page + 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                title='Go to next page'
              >
                Next
              </button>
            </div>

            </>
            
        }
      </div>

      {isModalOpen && (
        <UserModal
          user={selectedUser}
          mode={modalMode}
          onClose={handleCloseModal}
          onRefresh={handleRefresh}
        />
      )}
    </div>
  );
};
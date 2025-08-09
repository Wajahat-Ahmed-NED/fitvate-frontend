import React, { useState,useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Globe, Languages, Eye } from 'lucide-react';
import { Article, Language } from '../../types';
import { ArticleModal } from './ArticleModal';
import { clsx } from 'clsx';
import { deleteArticle, getAllLanguages, getArticles, getArticleByLanguage } from '../../api/adminPanelAPI';
import Swal from 'sweetalert2';
import { useAtomValue } from 'jotai';
import { authTokenAtom } from '../../store/auth';
// import { LanguageModal } from '../Settings/LanguageModal';

export const ArticleManagement: React.FC = () => {
  const adminToken = useAtomValue(authTokenAtom);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'view' | 'edit' | 'create'>('view');
  // const [languageModalMode, setLanguageModalMode] = useState<'view' | 'edit' | 'create'>('create');
  // const [languageToBeModified, setLanguageToBeModified] = useState<Language | null>(null);
  const [languages, setLanguages] = useState<Language[] | []>([]);  
  const [articles, setArticles] = useState<Article[]>([]);
    const [pagination, setPagination] = useState({
      page: 1,
      limit: 10,
      total: 0,
    });

  useEffect(()=>{
    getAllLanguages(adminToken).then((res)=>{
      if (res?.status == 200) {
              setLanguages(res?.data?.data)
            }
          }).catch((err) => {
            Swal.fire({
              title: 'Error!',
              text: `${err?.data?.message || 'Failed to fetch languages'}`,
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
    fetchArticles();
  },[])

  const fetchArticles = () => {
    getArticles(adminToken).then((res)=>{
      if (res?.status == 200) {
              setArticles(res?.data?.data?.articles)
              setPagination( prev => ({
                ...prev, 
                total: res?.data?.data?.totalPages || 0,
                limit: res?.data?.data?.pageSize || 10, 
                page: res?.data?.data?.currentPageNumber || 1
              }
              ));
            }
          }).catch((err) => {
            Swal.fire({
              title: 'Error!',
              text: `${err?.data?.message || 'Failed to fetch articles.'}`,
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
  }

  const handleDeleteArticle = (article: Article) => {
    deleteArticle(article, adminToken).then((res) => {
      if (res?.status == 200) {
        Swal.fire({
          title: 'Success!',
          text: `${res?.data?.message || 'Article Deleted Successfully'}`,
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
      fetchArticles();
    }).catch((err) => {
      Swal.fire({
        title: 'Error!',
        text: `${err?.data?.message || 'Failed to delete article'}`,
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

  const filteredArticles = articles?.filter(article => {
    const matchesSearch = Object.values(article?.title).some(title =>
      title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesLanguage = selectedLanguage === 'all' || 'en'//article?.languages.includes(selectedLanguage);
    return matchesSearch && matchesLanguage;
  });

  const handleCreateArticle = () => {
    setSelectedArticle(null);
    setModalMode('create');
    setIsModalOpen(true);
  };

  const handleViewArticle = (article: Article) => {
    setSelectedArticle(article);
    setModalMode('view');
    setIsModalOpen(true);
  };

  // const handleAddLanguage = () => {
  //   setLanguageToBeModified(null);
  //   setLanguageModalMode('create');
  //   setIsLanguageModalOpen(true);
  // };

  const handleEditArticle = (article: Article) => {
    setSelectedArticle(article);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedArticle(null);
  };

  // const handleCloseLanguageModal = () => {
  //   setIsLanguageModalOpen(false);
  //   setLanguageToBeModified(null);
  // };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'unpublished':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredArticlesByLanguage = (langCode: string) => {
    setSelectedLanguage(langCode);
    if (langCode === 'all') {
      setSearchTerm('');
      fetchArticles();
    } else {
      getArticleByLanguage(adminToken, langCode).then((res) => {
        if (res?.status === 200) {
          setArticles(res?.data?.data?.articles);
        }
      }).catch((err) => {
        Swal.fire({
          title: 'Error!',
          text: `${err?.data?.message || 'Failed to fetch articles by language'}`,
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
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Article Management</h2>
        <div className='flex flex-row gap-4'>
        {/* <button
          onClick={handleAddLanguage}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Language</span>
        </button> */}
        <button
          onClick={handleCreateArticle}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Article</span>
        </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={selectedLanguage}
              onChange={(e) => filteredArticlesByLanguage(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Languages</option>
              {languages?.map((lang) => (
                <option key={lang.locale} value={lang.locale}>
                  {lang.language}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Languages
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Updated
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredArticles?.map((article) => (
                <tr key={article?.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        src={article?.imageUrl || ''}
                        alt="Article"
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {JSON.parse(article?.title)[selectedLanguage] || Object.values(JSON.parse(article?.title))[0]}
                        </div>
                        <div className="text-sm text-gray-500">
                          {JSON.parse(article?.body)[selectedLanguage] || Object.values(JSON.parse(article?.body))[0]}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      <Languages className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {article?.locale}
                        {/* {article?.languages.length} language{article?.languages.length !== 1 ? 's' : ''} */}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                      getStatusColor(article?.status)
                    )}>
                      {article?.status.charAt(0).toUpperCase() + article?.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(article?.updatedAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleViewArticle(article)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                        title='View User'
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditArticle(article)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button  onClick={() => handleDeleteArticle(article)} className="text-red-600 hover:text-red-900 p-1 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                      {/* <button className="text-green-600 hover:text-green-900 p-1 rounded transition-colors">
                        <Globe className="w-4 h-4" />
                      </button> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center px-4 mt-4 gap-4">
              <span className="text-sm">
                Page Size: <span className="font-semibold">{pagination?.limit}</span>
              </span>
              {/* <span className="text-sm">
                Total Articles: <span className="font-semibold">{pagination?.total}</span>
              </span> */}
              <div className="flex justify-end items-center space-x-2">
              <button
                disabled={pagination?.page === 1}
                // onClick={() => fetchUsers(pagination?.page - 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                title='Go to previous page'
              >
                Previous
              </button>
              <span className="text-sm">
                {pagination?.page} / {Math.max(1, Math.ceil(pagination?.total / pagination?.limit))}
              </span>
              <button
                disabled={pagination?.page >= Math.ceil(pagination?.total / pagination?.limit)}
                // onClick={() => fetchUsers(pagination?.page + 1)}
                className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
                title='Go to next page'
              >
                Next
              </button>
              </div>
            </div>
      </div>

      {isModalOpen && (
        <ArticleModal
          article={selectedArticle}
          mode={modalMode}
          languages={languages}
          onClose={handleCloseModal}
          onRefresh={fetchArticles}
        />
      )}
{/* 
      {isLanguageModalOpen && (
        <LanguageModal
          language={languageToBeModified}
          mode={languageModalMode}
          onClose={handleCloseLanguageModal}
        />
      )} */}

    </div>
  );
};
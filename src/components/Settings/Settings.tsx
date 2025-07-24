import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, User, Bell, Shield, Database, Languages, Plus, Edit, Eye, Trash2 } from 'lucide-react';
import { Language } from '../../types';
import { clsx } from 'clsx';
import { deleteLanguage, getAllLanguages } from '../../api/adminPanelAPI';
import Swal from 'sweetalert2';
import { LanguageModal } from './LanguageModal';
import { useAtomValue } from 'jotai';
import { authTokenAtom } from '../../store/auth';

export const Settings: React.FC = () => {
  const adminToken = useAtomValue(authTokenAtom);
  const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);
  const [languageModalMode, setLanguageModalMode] = useState<'view' | 'edit' | 'create'>('create');
  const [languageToBeModified, setLanguageToBeModified] = useState<Language | null>(null);
  const [languages, setLanguages] = React.useState<Language[]>([]);

  useEffect(() => {
    fetchLanguages();
  }, [])

  const fetchLanguages = () => {
    getAllLanguages(adminToken).then((res) => {
      if (res?.status == 200) {
        setLanguages(res?.data?.data)
      }
    }).catch((err) => {
      Swal.fire({
        title: 'Error!',
        text: `${err?.data?.message || 'Failed to fetch languages.'}`,
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

  const handleAddLanguage = () => {
    setLanguageToBeModified(null);
    setLanguageModalMode('create');
    setIsLanguageModalOpen(true);
  };

  const handleViewLanguage = (language: Language) => {
    setLanguageToBeModified(language);
    setLanguageModalMode('view');
    setIsLanguageModalOpen(true);
  };

  const handleEditLanguage = (language: Language) => {
    setLanguageToBeModified(language);
    setLanguageModalMode('edit');
    setIsLanguageModalOpen(true);
  };

  const handleDeleteLanguage = (language: Language) => {
    deleteLanguage(language,adminToken).then((res) => {
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
      fetchLanguages();
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


  const handleCloseLanguageModal = () => {
    setIsLanguageModalOpen(false);
    setLanguageToBeModified(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Settings</h2>
        <p className="text-gray-600">Manage your application settings and preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <Languages className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Languages</h3>
                <p className="text-sm text-gray-600">Manage supported languages for the application</p>
              </div>
            </div>
            <button onClick={handleAddLanguage} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Add Language</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Locale
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Language
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {languages?.map((language) => (
                <tr key={language.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {language.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-sm text-gray-900 bg-gray-100 px-2 py-1 rounded">
                      {language.locale}
                    </code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <Languages className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900">{language.language}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full',
                      language.isActive
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    )}>
                      {language.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button title='View Language' onClick={() => handleViewLanguage(language)} className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button title='Edit Language' onClick={() => handleEditLanguage(language)} className="text-gray-600 hover:text-gray-900 p-1 rounded transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button title='Delete Language' onClick={() => handleDeleteLanguage(language)} className="text-red-600 hover:text-red-900 p-1 rounded transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>


      {isLanguageModalOpen && (
        <LanguageModal
          language={languageToBeModified}
          mode={languageModalMode}
          onClose={handleCloseLanguageModal}
          onRefresh={fetchLanguages}
        />
      )}

      {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                defaultValue="admin@example.com"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                defaultValue="Admin User"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <Bell className="w-5 h-5 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Email Notifications</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">User Registration Alerts</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">System Alerts</span>
              <input
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Security</h3>
          </div>
          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="font-medium text-gray-900">Change Password</div>
              <div className="text-sm text-gray-600">Update your account password</div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="font-medium text-gray-900">Two-Factor Authentication</div>
              <div className="text-sm text-gray-600">Enable 2FA for enhanced security</div>
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Database className="w-5 h-5 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">System</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Maintenance Mode</span>
              <input
                type="checkbox"
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <button className="w-full text-left px-4 py-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="font-medium text-gray-900">Export Data</div>
              <div className="text-sm text-gray-600">Download system data backup</div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
              <div className="font-medium text-red-900">Clear Cache</div>
              <div className="text-sm text-red-600">Clear application cache</div>
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          Reset to Defaults
        </button>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Save Changes
        </button>
      </div> */}
    </div>
  );
};
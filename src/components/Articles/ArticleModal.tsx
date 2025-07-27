import React, { useState } from 'react';
import { X, Image, Languages, Wand2 } from 'lucide-react';
import { Article, Language } from '../../types';
import { clsx } from 'clsx';
import { createArticle, updateArticle } from '../../api/adminPanelAPI';
import Swal from 'sweetalert2';
import { useAtomValue } from 'jotai';
import { authTokenAtom } from '../../store/auth';

interface ArticleModalProps {
  article: Article | null;
  mode: 'view' | 'edit' | 'create';
  languages: Language[];
  onClose: () => void;
  onRefresh: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, mode, languages, onClose, onRefresh }) => {
  const adminToken = useAtomValue(authTokenAtom);
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    //article?.languages || ['en']
    ['en']
  );
  const [formData, setFormData] = useState<Article>({
  id: article?.id || '',
  title: article?.title || '',
  body: article?.body || '',
  imageUrl: article?.imageUrl || '',
  status: article?.status || 'Draft',
  topic: article?.topic || '',
  type: article?.type || '',
  locale: article?.locale || 'en',
  createdAt: article?.createdAt || new Date().toISOString(),
  updatedAt: article?.updatedAt || new Date().toISOString(),
  source: article?.source || '',
  category: article?.category || '',
  userId: article?.userId || '',
});



  const handleLanguageToggle = (langCode: string) => {
    if (selectedLanguages?.includes(langCode)) {
      setSelectedLanguages(selectedLanguages?.filter(code => code !== langCode));
    } else {
      setSelectedLanguages([...selectedLanguages, langCode]);
    }
  };

  const handleAutoTranslate = () => {
    // Simulate auto-translation
    // const englishTitle = formData?.title //formData?.title.en;
    // const englishDescription = formData?.body;
    
    // const newTitle = { ...formData?.title };
    // const newDescription = { ...formData?.body };
    
    // selectedLanguages?.forEach(langCode => {
    //   if (langCode !== 'en') {
    //     // Mock translation - in real app, this would call a translation API
    //     newTitle[langCode] = `[${langCode.toUpperCase()}] ${englishTitle}`;
    //     newDescription[langCode] = `[${langCode.toUpperCase()}] ${englishDescription}`;
    //   }
    // });
    
    // setFormData({
    //   ...formData,
    //   title: newTitle,
    //   description: newDescription,
    // });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log('Article submitted:', formData);

    switch (mode) {
            case 'create':

                createArticle(formData,adminToken).then((res) => {
                    if (res?.status == 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: `${res?.data?.message || 'Article Created Successfully'}`,
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
                    onRefresh();
                }).catch((err) => {
                    Swal.fire({
                        title: 'Error!',
                        text: `${err?.data?.message || 'Failed to create Article'}`,
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
                break;
            case 'edit':

                updateArticle(formData, adminToken).then((res) => {
                    if (res?.status == 200) {
                        Swal.fire({
                            title: 'Success!',
                            text: `${res?.data?.message || 'Article Updated Successfully'}`,
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
                    onRefresh();
                }).catch((err) => {
                    Swal.fire({
                        title: 'Error!',
                        text: `${err?.data?.message || 'Failed to update Article'}`,
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
                break;

            default:
                break;
        }
    onClose();
  };

  const isReadonly = mode === 'view';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Create Article' : mode === 'edit' ? 'Edit Article' : 'Article Details'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <div className="flex space-x-3">
                  <div className="flex-1 relative">
                    <Image className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="url"
                      value={formData?.imageUrl || ''}
                      onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                      disabled={isReadonly}
                      className={clsx(
                        'w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                        isReadonly && 'bg-gray-50 cursor-not-allowed'
                      )}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>
                {formData?.imageUrl && (
                  <div className="mt-3">
                    <img
                      src={formData?.imageUrl}
                      alt="Article preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData?.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  disabled={isReadonly}
                  className={clsx(
                    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    isReadonly && 'bg-gray-50 cursor-not-allowed'
                  )}
                >
                  <option value="Draft">Draft</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Published">Published</option>
                  <option value="Unpublished">Unpublished</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Content ({activeLanguage?.toUpperCase()})
                  </label>
                  <div className="flex items-center space-x-2">
                    <select
                      value={activeLanguage}
                      onChange={(e) => setActiveLanguage(e.target.value)}
                      className="px-3 py-1 border border-gray-300 rounded text-sm"
                    >
                      {selectedLanguages?.map(langCode => {
                        const lang = languages.find(l => l.locale === langCode);
                        return (
                          <option key={langCode} value={langCode}>
                            {lang?.language || langCode}
                          </option>
                        );
                      })}
                    </select>
                    {!isReadonly && (
                      <button
                        type="button"
                        onClick={handleAutoTranslate}
                        className="flex items-center space-x-1 px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700 transition-colors"
                      >
                        <Wand2 className="w-3 h-3" />
                        <span>Auto Translate</span>
                      </button>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={formData?.title || ''} //formData?.title[activeLanguage] 
                      onChange={(e) => setFormData({
                        ...formData,
                        title: e.target.value //{ ...formData?.title, [activeLanguage]: e.target.value }
                      })}       
                      disabled={isReadonly}
                      className={clsx(
                        'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                        isReadonly && 'bg-gray-50 cursor-not-allowed'
                      )}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <input
                      type="text"
                      value={formData?.type || ''} //formData?.type[activeLanguage] 
                      onChange={(e) => setFormData({
                        ...formData,
                        type: e.target.value //{ ...formData?.type, [activeLanguage]: e.target.value }
                      })}       
                      disabled={isReadonly}
                      className={clsx(
                        'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                        isReadonly && 'bg-gray-50 cursor-not-allowed'
                      )}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Topic
                    </label>
                    <input
                      type="text"
                      value={formData?.topic || ''} //formData?.topic[activeLanguage] 
                      onChange={(e) => setFormData({
                        ...formData,
                        topic: e.target.value //{ ...formData?.topic, [activeLanguage]: e.target.value }
                      })}       
                      disabled={isReadonly}
                      className={clsx(
                        'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                        isReadonly && 'bg-gray-50 cursor-not-allowed'
                      )}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value= {formData?.body || ''}//{formData?.body[activeLanguage] || ''}
                      onChange={(e) => setFormData({
                        ...formData,
                        body: e.target.value  //{ ...formData?.body, [activeLanguage]: e.target.value }
                      })}
                      disabled={isReadonly}
                      rows={6}
                      className={clsx(
                        'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                        isReadonly && 'bg-gray-50 cursor-not-allowed'
                      )}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Languages
                </label>
                <div className="space-y-2">
                  {languages?.map((lang) => (
                    <div key={lang.locale} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={`lang-${lang.locale}`}
                        checked={selectedLanguages?.includes(lang.locale)}
                        onChange={() => handleLanguageToggle(lang.locale)}
                        disabled={isReadonly}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor={`lang-${lang.locale}`}
                        className="text-sm font-medium text-gray-700 flex items-center space-x-2"
                      >
                        <Languages className="w-4 h-4 text-gray-400" />
                        <span>{lang.language}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Translation Status</h3>
                <div className="space-y-2">
                  {selectedLanguages?.map(langCode => {
                    const lang = languages.find(l => l.locale === langCode);
                    const hasTitle = formData?.title; //formData?.title[langCode];
                    const hasDescription = formData?.body; //formData?.body[langCode];
                    const isComplete = hasTitle && hasDescription;
                    
                    return (
                      <div key={langCode} className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{lang?.language || langCode}</span>
                        <span className={clsx(
                          'px-2 py-1 text-xs rounded-full',
                          isComplete
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        )}>
                          {isComplete ? 'Complete' : 'Incomplete'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {!isReadonly && (
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {mode === 'create' ? 'Create Article' : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { X, } from 'lucide-react';
import { Language } from '../../types';
import { clsx } from 'clsx';
import { addLanguage, editLanguage } from '../../api/adminPanelAPI';
import Swal from 'sweetalert2';
import { useAtomValue } from 'jotai';
import { authTokenAtom } from '../../store/auth';

interface LanguageModalProps {
    language: Language | null;
    mode: 'view' | 'edit' | 'create';
    onClose: () => void;
    onRefresh: () => void;
}

export const LanguageModal: React.FC<LanguageModalProps> = ({ language, mode, onClose, onRefresh }) => {
    const [formData, setFormData] = useState({
        id: language?.id || 0,
        locale: language?.locale || '',
        language: language?.language || '',
        isActive: language?.isActive || true
    });
    const adminToken = useAtomValue(authTokenAtom);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // console.log('Language added:', formData);
        switch (mode) {
            case 'create':

                addLanguage(formData, adminToken).then((res) => {
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
                    onRefresh();
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
                break;
            case 'edit':

                editLanguage(formData,adminToken).then((res) => {
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
                    onRefresh();
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
                break;

            default:
                break;
        }
        onClose();
    };

    const isReadonly = mode === 'view';

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-screen overflow-y-auto">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-900">
                        {mode === 'create' ? 'Add Language' : mode === 'edit' ? 'Edit Language' : 'Language Details'}
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
                        <div className="lg:col-span-3 space-y-6">
                            <div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            value={formData?.language || ''}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                language: e.target.value
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
                                            Code
                                        </label>
                                        <input
                                            type="text"
                                            value={formData?.locale || ''}
                                            onChange={(e) => setFormData({
                                                ...formData,
                                                locale: e.target.value
                                            })}
                                            disabled={isReadonly}
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
                                {mode === 'create' ? 'Add Language' : 'Save Changes'}
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};
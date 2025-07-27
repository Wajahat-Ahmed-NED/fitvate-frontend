import React, { useEffect, useState } from 'react';
import { X, Calendar, Shield, ShoppingCart, Package,Crown } from 'lucide-react';
import { User, Purchase } from '../../types';
import { clsx } from 'clsx';
import { getPurchases, updateProfile } from '../../api/adminPanelAPI';
import Swal from 'sweetalert2';
import { useAtomValue } from 'jotai';
import { authTokenAtom } from '../../store/auth';

interface UserModalProps {
  user: User | null;
  mode: 'view' | 'edit' | 'create';
  onClose: () => void;
  onRefresh: () => void;
}

export const UserModal: React.FC<UserModalProps> = ({ user, mode, onClose, onRefresh }) => {
  const adminToken = useAtomValue(authTokenAtom);
  const [formData, setFormData] = useState({
    id: user?.id || '',
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    provider: user?.provider || '',
    profilePic: user?.profilePic || '',
    mobileNumber: user?.mobileNumber || '',
    dateofBirth: user?.dateofBirth || '',
    gender: user?.gender || '',
    height: user?.height || '',
    weight: user?.weight || '',
    blocked: user?.blocked || false,
    createdAt: user?.createdAt || '',
    premiumMembership: user?.premiumMembership || false,
  });
  const [purchaseData, setPurchaseData] = useState<Purchase[] | []>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    // console.log('Form submitted:', formData);
    // console.log('Form mode:', mode);
    if (mode === "edit") {
      updateProfile(formData, adminToken)
        .then((res) => {
          // console.log(res);
          Swal.fire({
            title: 'Success!',
            text: 'Updated Successfully',
            timer: 5000,
            icon: 'success',
            width: '300px',
            padding: '1rem',
            customClass: {
              popup: 'p-4 rounded-md shadow-md', // outer box
              title: 'text-lg font-semibold',     // title
              htmlContainer: 'text-sm',           // content text
              confirmButton: 'bg-blue-600 shadow-lg hover:bg-blue-700 text-white px-4 py-2 rounded', // Tailwind button
              // cancelButton: 'bg-gray-300 text-black px-4 py-2 rounded',
            },
            // showCancelButton: true,
            confirmButtonText: 'Okay',
            // cancelButtonText: 'Cancel',
            buttonsStyling: false, // required to use Tailwind styles
          });
        })
    }
    onClose();
    onRefresh();
  };

  const isReadonly = mode === 'view';

  useEffect(() => {
    if(mode === 'view') {
      getPurchases(user?.id || '', adminToken).then((res) => {
        // console.log("Purchase Data: ", res);
        setPurchaseData(res?.data?.data || []);
      }).catch((err) => {
        console.error("Error fetching purchases: ", err);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to fetch purchase data',
          icon: 'error',
          confirmButtonText: 'Okay',
          customClass: {
            popup: 'p-4 rounded-md shadow-md',
            title: 'text-lg font-semibold',
            htmlContainer: 'text-sm',
            confirmButton: 'bg-red-600 text-white px-4 py-2 rounded',
          },
          buttonsStyling: false,
        });
      });
    }
  }, [user]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 max-h-[75vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {mode === 'create' ? 'Create User' : mode === 'edit' ? 'Edit User' : 'User Details'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
              <input
                type="text"
                value={formData?.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isReadonly}
                className={clsx(
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  isReadonly && 'bg-gray-50 cursor-not-allowed'
                )}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={formData?.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                disabled={isReadonly}
                className={clsx(
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  isReadonly && 'bg-gray-50 cursor-not-allowed'
                )}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {mode !== "edit" && <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={formData?.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isReadonly}
                  className={clsx(
                    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    isReadonly && 'bg-gray-50 cursor-not-allowed'
                  )}
                  required
                />
              </div>


              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
                <input
                  type="text"
                  value={formData?.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  disabled={isReadonly}
                  className={clsx(
                    'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                    isReadonly && 'bg-gray-50 cursor-not-allowed'
                  )}
                />
              </div>
            </>
            }

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Provider</label>
              <input
                type="text"
                value={formData?.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                disabled={isReadonly}
                className={clsx(
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  isReadonly && 'bg-gray-50 cursor-not-allowed'
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture URL</label>
              <input
                type="text"
                value={formData?.profilePic}
                onChange={(e) => setFormData({ ...formData, profilePic: e.target.value })}
                disabled={isReadonly}
                className={clsx(
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  isReadonly && 'bg-gray-50 cursor-not-allowed'
                )}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number</label>
              <input
                type="text"
                value={formData?.mobileNumber}
                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                disabled={isReadonly}
                className={clsx(
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  isReadonly && 'bg-gray-50 cursor-not-allowed'
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
              <input
                type="date"
                value={formData?.dateofBirth}
                onChange={(e) => setFormData({ ...formData, dateofBirth: e.target.value })}
                disabled={isReadonly}
                className={clsx(
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  isReadonly && 'bg-gray-50 cursor-not-allowed'
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Height</label>
              <input
                type="text"
                value={formData?.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                disabled={isReadonly}
                className={clsx(
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  isReadonly && 'bg-gray-50 cursor-not-allowed'
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Weight</label>
              <input
                type="text"
                value={formData?.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                disabled={isReadonly}
                className={clsx(
                  'w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
                  isReadonly && 'bg-gray-50 cursor-not-allowed'
                )}
              />
            </div>
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-3">
              {/* <input
                type="checkbox"
                id="isPremium"
                checked={formData?.isPremium}
                onChange={(e) => setFormData({ ...formData, isPremium: e.target.checked })}
                disabled={isReadonly}
                className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isPremium" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Crown className="w-4 h-4 text-yellow-500" />
                <span>Premium Member</span>
              </label> */}
            </div>

            {/* <div className="flex items-center space-x-3">
              <input
                type="checkbox"
                id="isBlocked"
                checked={formData?.blocked}
                onChange={(e) => setFormData({ ...formData, blocked: e.target.checked })}
                disabled={isReadonly}
                className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
              />
              <label htmlFor="isBlocked" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                <Shield className="w-4 h-4 text-red-500" />
                <span>Blocked</span>
              </label>
            </div> */}
          </div>

          {user && mode !== "edit" && (
            <>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Account Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium">{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : ''}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="isPremium"
                    checked={formData.premiumMembership}
                    onChange={(e) => setFormData({ ...formData, premiumMembership: e.target.checked })}
                    disabled={isReadonly}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isPremium" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Crown className="w-4 h-4 text-yellow-500" />
                    <span>Premium Member</span>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  {/* <UserIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-600">Last Login:</span>
                  <span className="font-medium">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </span> */}
                  <input
                    type="checkbox"
                    id="isBlocked"
                    checked={formData?.blocked}
                    onChange={(e) => setFormData({ ...formData, blocked: e.target.checked })}
                    disabled={isReadonly}
                    className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isBlocked" className="text-sm font-medium text-gray-700 flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-red-500" />
                    <span>Blocked</span>
                  </label>
                </div>
              </div>
            </div>

            
              
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-4">
                <ShoppingCart className="w-5 h-5 text-gray-600" />
                <h3 className="text-sm font-medium text-gray-700">Purchase History</h3>
                <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {purchaseData?.length} purchase{purchaseData?.length !== 1 ? 's' : ''}
                </span>
              </div>

              <div className="space-y-3 max-h-64 overflow-y-scroll drop-shadow-md">
                {purchaseData?.map((purchase) => (
                  <div key={purchase.id} className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Package className="w-4 h-4 text-blue-500" />
                          <span className="text-sm font-medium text-gray-900">
                            Product ID: {purchase.productId}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 gap-2 text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Order ID:</span>
                            <code className="bg-gray-100 px-1 rounded text-xs">
                              {purchase.orderId}
                            </code>
                          </div>
                          {/* <div className="flex justify-between">
                            <span>Purchase Date:</span>
                            <span className="font-medium">
                              {new Date(purchase.createdAt).toLocaleDateString()}
                            </span>
                          </div> */}
                          <div className="flex justify-between">
                            <span>Token:</span>
                            <code className="bg-gray-100 px-1 rounded text-xs max-w-32 truncate">
                              {purchase.purchaseToken}
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            </>
          )}

          {/* {!isReadonly && ( */}
            <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {!isReadonly? 'Cancel': 'Close'}
              </button>
              {!isReadonly && (
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {mode === 'create' ? 'Create User' : 'Save Changes'}
              </button>
              )}
            </div>
          {/* )} */}
        </form>
      </div>
    </div>
  );
};
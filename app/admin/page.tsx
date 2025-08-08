'use client';

import React, { useEffect, useState } from 'react';
import { X, Eye, Trash2 } from 'lucide-react';
import { auth, db } from '@/lib/firebaseConfig';
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from 'firebase/firestore';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [activeTab, setActiveTab] = useState<'payments' | 'users'>('payments');
  const [users, setUsers] = useState<any[]>([]);
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [selectedProof, setSelectedProof] = useState<any>(null);

  useEffect(() => {
    setLoading(false);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUsers();
      fetchSubscriptions();
    }
  }, [isAuthenticated]);

  const fetchUsers = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      const usersData = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchSubscriptions = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'subscriptions'));
      const subData = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setSubscriptions(subData);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

   

    try {
      const q = query(
        collection(db, 'admin'),
        where('email', '==', loginForm.email),
        where('password', '==', loginForm.password)
      );

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        setIsAuthenticated(true);
        localStorage.setItem('isAdmin', 'true'); // ✅ Save login session
      } else {
        setLoginError('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Something went wrong during login');
    } finally {
      setLoginLoading(false);
    }
  };

 const handleLogout = async () => {
  setIsAuthenticated(false);
  localStorage.removeItem('isAdmin'); // ✅ Clear login session
};

  const handlePaymentAction = async (
    subId: string,
    action: 'approve' | 'reject'
  ) => {
    try {
      await updateDoc(doc(db, 'subscriptions', subId), {
        paymentStatus: action === 'approve' ? 'approved' : 'rejected',
      });

      setSubscriptions((prev) =>
        prev.map((s) =>
          s.id === subId
            ? { ...s, paymentStatus: action === 'approve' ? 'approved' : 'rejected' }
            : s
        )
      );
    } catch (error) {
      console.error('Error updating payment status:', error);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await deleteDoc(doc(db, 'users', userId));
      setUsers((prev) => prev.filter((u) => u.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStats = () => {
    const pending = subscriptions.filter((s) => s.paymentStatus === 'pending').length;
    const approved = subscriptions.filter((s) => s.paymentStatus === 'approved').length;
    const totalRevenue = subscriptions
      .filter((s) => s.paymentStatus === 'approved')
      .reduce((sum, s) => sum + (s.paymentAmount || 0), 0);
    return { pending, approved, totalRevenue };
  };

  const getUserName = (userId: string) => {
    const user = users.find((u) => u.id === userId);
    return user ? `${user.firstName} ${user.lastName}` : userId;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-center">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              value={loginForm.email}
              onChange={(e) =>
                setLoginForm({ ...loginForm, email: e.target.value })
              }
              placeholder="Email"
              required
              className="w-full border px-3 py-2 rounded"
            />
            <input
              type="password"
              value={loginForm.password}
              onChange={(e) =>
                setLoginForm({ ...loginForm, password: e.target.value })
              }
              placeholder="Password"
              required
              className="w-full border px-3 py-2 rounded"
            />
            {loginError && (
              <p className="text-red-500 text-sm">{loginError}</p>
            )}
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-pink-500 text-white py-2 rounded"
            >
              {loginLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  const stats = getPaymentStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-6 py-4 flex justify-between">
        <h1 className="text-xl font-bold">Matrimony Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </header>

      <div className="flex">
        <aside className="w-64 bg-white border-r p-4 space-y-2">
          <button
            onClick={() => setActiveTab('payments')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === 'payments' ? 'bg-pink-100' : ''
            }`}
          >
            Payment Verification
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`w-full text-left px-4 py-2 rounded ${
              activeTab === 'users' ? 'bg-pink-100' : ''
            }`}
          >
            User Management
          </button>
        </aside>

        <main className="flex-1 p-6">
          {activeTab === 'payments' && (
            <div>
              <h2 className="text-lg font-bold mb-4">Payment Verification</h2>
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white rounded shadow">
                  <p className="text-gray-600">Pending</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                  <p className="text-gray-600">Approved</p>
                  <p className="text-2xl font-bold">{stats.approved}</p>
                </div>
                <div className="p-4 bg-white rounded shadow">
                  <p className="text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold">${stats.totalRevenue}</p>
                </div>
              </div>

              <table className="w-full bg-white rounded shadow overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3">Transaction ID</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id} className="border-t">
                      <td className="p-3">{getUserName(sub.userId)}</td>
                      <td className="p-3">{sub.transactionId}</td>
                      <td className="p-3">${sub.paymentAmount}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${getStatusColor(sub.paymentStatus)}`}>{sub.paymentStatus}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-2 flex-wrap">
                          {sub.paymentStatus === 'pending' && (
                            <>
                              <button onClick={() => handlePaymentAction(sub.id, 'approve')} className="bg-green-500 text-white px-2 py-1 rounded text-sm">Approve</button>
                              <button onClick={() => handlePaymentAction(sub.id, 'reject')} className="bg-red-500 text-white px-2 py-1 rounded text-sm">Reject</button>
                            </>
                          )}
                          <button onClick={() => setSelectedProof(sub)} className="bg-blue-500 text-white px-2 py-1 rounded text-sm flex items-center">
                            <Eye className="w-3 h-3 mr-1" /> View Proof
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <h2 className="text-lg font-bold mb-4">User Management</h2>
              <p className="mb-4">Total Users: {users.length}</p>
              <table className="w-full bg-white rounded shadow overflow-hidden">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">User</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id} className="border-t">
                      <td className="p-3">{u.firstName} {u.lastName}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">
                        <button onClick={() => handleDeleteUser(u.id)} className="bg-red-500 text-white px-2 py-1 rounded text-sm flex items-center">
                          <Trash2 className="w-3 h-3 mr-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </main>
      </div>

      {selectedProof && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-lg w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold">Payment Proof - {selectedProof.transactionId}</h3>
              <button onClick={() => setSelectedProof(null)}>
                <X />
              </button>
            </div>
            <p><strong>User:</strong> {getUserName(selectedProof.userId)}</p>
            <p><strong>Amount:</strong> ${selectedProof.paymentAmount}</p>
            <p><strong>Status:</strong> {selectedProof.paymentStatus}</p>
            <p><strong>Submitted At:</strong> {selectedProof.submittedAt}</p>
            <img src={selectedProof.paymentScreenshot} alt="Proof" className="mt-4 w-full rounded border" />
          </div>
        </div>
      )}
    </div>
  );
}
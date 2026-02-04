import React, { useState, useContext } from 'react';
import { X, Scale, LogIn, UserPlus, AlertCircle, Loader2 } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { loginUser, registerUser } from '../../services/api';
import { AVATARS } from '../../utils/constants';

const LoginModal = ({ setIsLoginModalOpen }) => {
  const { login } = useContext(AuthContext);
  const [isRegistering, setIsRegistering] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form State
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    avatar: AVATARS[0]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let data;
      if (isRegistering) {
        data = await registerUser(formData);
      } else {
        data = await loginUser(formData.email, formData.password);
      }
      
      // Update Global Context
      login(data.token, data.user);
      setIsLoginModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.msg || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-110 flex items-center justify-center p-6 bg-gray-950/60 backdrop-blur-md animate-in fade-in zoom-in duration-300">
      <div className="w-full max-w-md bg-white dark:bg-gray-900 rounded-[2.5rem] shadow-2xl p-8 border border-gray-100 dark:border-gray-800 relative">
        <button 
          onClick={() => setIsLoginModalOpen(false)} 
          className="absolute right-6 top-6 p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
        >
          <X size={24} />
        </button>

        <div className="flex justify-center mb-6">
          <div className="p-4 bg-blue-600 rounded-3xl shadow-xl">
            <Scale className="text-white" size={40} />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-center mb-2 serif dark:text-white">
          {isRegistering ? 'Join the Republic' : 'Welcome Back'}
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-center mb-8 text-sm">
          {isRegistering ? 'Create an account to save your history' : 'Sign in to access your consultations'}
        </p>
        
        {error && (
          <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/20 text-red-500 text-sm rounded-xl flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <input 
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 px-5 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
              />
            </div>
          )}
          
          <input 
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email Address"
            required
            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 px-5 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
          />
          
          <input 
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-3 px-5 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
          />

          {isRegistering && (
            <div className="pt-2">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Choose Avatar</label>
              <div className="grid grid-cols-6 gap-2">
                {AVATARS.map(avatar => (
                  <label key={avatar} className="cursor-pointer">
                    <input 
                      type="radio" 
                      name="avatar" 
                      value={avatar} 
                      checked={formData.avatar === avatar}
                      onChange={handleChange}
                      className="hidden peer" 
                    />
                    <div className="w-full aspect-square flex items-center justify-center text-xl bg-gray-50 dark:bg-gray-800 rounded-xl peer-checked:bg-blue-600 peer-checked:text-white transition-all hover:scale-105 active:scale-95 shadow-sm border border-transparent peer-checked:border-blue-500">
                      {avatar}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black shadow-xl shadow-blue-200 dark:shadow-blue-900/20 hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2 mt-4"
          >
            {loading ? <Loader2 className="animate-spin" /> : (isRegistering ? <UserPlus size={20}/> : <LogIn size={20}/>)}
            {isRegistering ? 'Create Account' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            onClick={() => setIsRegistering(!isRegistering)}
            className="text-sm font-bold text-gray-400 hover:text-blue-600 transition-colors"
          >
            {isRegistering ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
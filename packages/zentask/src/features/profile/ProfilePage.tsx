import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { FiUser, FiMail, FiPhone, FiEdit2 } from 'react-icons/fi';

// Mock user data - in a real app this would come from a store or API
const initialUserData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '(123) 456-7890',
  bio: 'Product manager with 5 years of experience in software development. I love organizing tasks and increasing productivity.',
  avatar: 'https://api.dicebear.com/6.x/avataaars/svg?seed=user123',
};

// Form validation schema
const profileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState(initialUserData);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: userData,
  });
  
  const handleProfileSubmit = (data: ProfileFormValues) => {
    try {
      // In a real app, this would send data to an API or update a store
      setUserData({ ...userData, ...data });
      setIsEditing(false);
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('An error occurred. Please try again.');
      console.error(error);
    }
  };
  
  const handleCancelEdit = () => {
    setIsEditing(false);
    reset(userData);
  };
  
  // Calculate task stats - in a real app would be from a store or API
  const stats = [
    { label: 'Tasks Completed', value: 24 },
    { label: 'On Time Rate', value: '92%' },
    { label: 'Productivity Score', value: '87/100' },
  ];
  
  return (
    <div className="container mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="card bg-base-200 shadow-xl lg:col-span-2">
          <div className="card-body">
            <div className="flex justify-between items-start mb-4">
              <h2 className="card-title">Profile Information</h2>
              {!isEditing && (
                <button 
                  className="btn btn-ghost btn-sm"
                  onClick={() => setIsEditing(true)}
                >
                  <FiEdit2 size={16} className="mr-1" />
                  Edit
                </button>
              )}
            </div>
            
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-none flex flex-col items-center">
                <div className="avatar">
                  <div className="w-32 rounded-full">
                    <img src={userData.avatar} alt="User Avatar" />
                  </div>
                </div>
                {!isEditing && (
                  <div className="text-center mt-4">
                    <h3 className="text-xl font-bold">{userData.name}</h3>
                    <p className="text-sm opacity-80">{userData.email}</p>
                  </div>
                )}
              </div>
              
              <div className="flex-1">
                {isEditing ? (
                  <form onSubmit={handleSubmit(handleProfileSubmit)} className="space-y-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Full Name</span>
                      </label>
                      <input 
                        type="text" 
                        className={`input input-bordered w-full ${errors.name ? 'input-error' : ''}`}
                        placeholder="Enter your full name"
                        {...register('name')}
                      />
                      {errors.name && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.name.message}</span>
                        </label>
                      )}
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Email</span>
                      </label>
                      <input 
                        type="email" 
                        className={`input input-bordered w-full ${errors.email ? 'input-error' : ''}`}
                        placeholder="Enter your email"
                        {...register('email')}
                      />
                      {errors.email && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.email.message}</span>
                        </label>
                      )}
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Phone Number (Optional)</span>
                      </label>
                      <input 
                        type="tel" 
                        className={`input input-bordered w-full ${errors.phone ? 'input-error' : ''}`}
                        placeholder="Enter your phone number"
                        {...register('phone')}
                      />
                      {errors.phone && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.phone.message}</span>
                        </label>
                      )}
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Bio</span>
                      </label>
                      <textarea 
                        className={`textarea textarea-bordered h-24 ${errors.bio ? 'textarea-error' : ''}`}
                        placeholder="Tell us about yourself"
                        {...register('bio')}
                      />
                      {errors.bio && (
                        <label className="label">
                          <span className="label-text-alt text-error">{errors.bio.message}</span>
                        </label>
                      )}
                    </div>
                    
                    <div className="flex justify-end space-x-2 pt-2">
                      <button 
                        type="button" 
                        className="btn btn-ghost" 
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save Changes
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <FiUser className="mt-1 mr-2 text-primary" />
                      <div>
                        <h4 className="text-sm font-semibold opacity-70">About Me</h4>
                        <p>{userData.bio}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <FiMail className="mr-2 text-primary" />
                      <div>
                        <h4 className="text-sm font-semibold opacity-70">Email</h4>
                        <p>{userData.email}</p>
                      </div>
                    </div>
                    
                    {userData.phone && (
                      <div className="flex items-center">
                        <FiPhone className="mr-2 text-primary" />
                        <div>
                          <h4 className="text-sm font-semibold opacity-70">Phone</h4>
                          <p>{userData.phone}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Stats Card */}
        <div className="card bg-base-200 shadow-xl">
          <div className="card-body">
            <h2 className="card-title mb-4">Activity Summary</h2>
            
            <div className="space-y-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <div className="stat-title">{stat.label}</div>
                  <div className="stat-value">{stat.value}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <div className="text-sm font-semibold mb-2">Most Active Days</div>
              <div className="flex justify-between">
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-primary rounded-t-md" style={{ height: '60px' }}></div>
                  <div className="text-xs mt-1">Mon</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-primary rounded-t-md" style={{ height: '40px' }}></div>
                  <div className="text-xs mt-1">Tue</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-primary rounded-t-md" style={{ height: '80px' }}></div>
                  <div className="text-xs mt-1">Wed</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-primary rounded-t-md" style={{ height: '30px' }}></div>
                  <div className="text-xs mt-1">Thu</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-primary rounded-t-md" style={{ height: '50px' }}></div>
                  <div className="text-xs mt-1">Fri</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-primary rounded-t-md opacity-50" style={{ height: '20px' }}></div>
                  <div className="text-xs mt-1">Sat</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-8 bg-primary rounded-t-md opacity-50" style={{ height: '10px' }}></div>
                  <div className="text-xs mt-1">Sun</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 
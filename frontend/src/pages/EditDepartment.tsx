import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { GET_DEPARTMENT, UPDATE_DEPARTMENT } from '../graphql/queries';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

interface DepartmentFormData {
  name: string;
  description: string;
  manager: string;
  location: string;
  status: boolean;
}

export default function EditDepartment() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, loading } = useQuery(GET_DEPARTMENT, {
    variables: { id: id || '1' },
  });

  const { register, handleSubmit, formState: { errors }, reset } = useForm<DepartmentFormData>();

  const [updateDepartment, { loading: updating }] = useMutation(UPDATE_DEPARTMENT, {
    onCompleted: () => {
      alert('Department updated successfully!');
      navigate(`/departments/${id}`);
    },
    onError: (error) => {
      alert(`Error updating department: ${error.message}`);
    },
  });

  useEffect(() => {
    if (data?.getDepartment) {
      reset({
        name: data.getDepartment.name,
        description: data.getDepartment.description,
        manager: data.getDepartment.manager,
        location: data.getDepartment.location,
        status: data.getDepartment.status,
      });
    }
  }, [data, reset]);

  const onSubmit = (formData: DepartmentFormData) => {
    updateDepartment({
      variables: {
        id: id || '1',
        input: formData,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-light">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-light">
      <Sidebar />
      
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <Header
            title="Edit Department"
            breadcrumbs={['Dashboard', 'Departments', data?.getDepartment?.name || 'Edit']}
          />

          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-card p-8">
            <div className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-dark mb-2">
                  Department Name
                </label>
                <input
                  id="name"
                  type="text"
                  {...register('name', { required: 'Name is required' })}
                  className="w-full px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-dark mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  {...register('description', { required: 'Description is required' })}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.description && (
                  <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="manager" className="block text-sm font-medium text-dark mb-2">
                  Manager
                </label>
                <input
                  id="manager"
                  type="text"
                  {...register('manager', { required: 'Manager is required' })}
                  className="w-full px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.manager && (
                  <p className="text-red-600 text-sm mt-1">{errors.manager.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-dark mb-2">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  {...register('location', { required: 'Location is required' })}
                  className="w-full px-4 py-2 border border-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                {errors.location && (
                  <p className="text-red-600 text-sm mt-1">{errors.location.message}</p>
                )}
              </div>

              <div className="flex items-center">
                <input
                  id="status"
                  type="checkbox"
                  {...register('status')}
                  className="w-4 h-4 text-primary border-gray-light rounded focus:ring-2 focus:ring-primary"
                />
                <label htmlFor="status" className="ml-2 text-sm font-medium text-dark">
                  Active Status
                </label>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 mt-8 pt-6 border-t border-gray-light">
              <button
                type="button"
                onClick={() => navigate(`/departments/${id}`)}
                className="px-6 py-2 border border-gray-light text-gray rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {updating ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

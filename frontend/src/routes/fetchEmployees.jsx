import { useState, useEffect, useContext } from 'react';
import { FaEllipsisV } from 'react-icons/fa';
import { UserContext } from '../context/UserContext.jsx';

export function FetchEmp() {
  const { employeesData, getEmployees, searchEmployees, deleteEmployee, saveEmployee, loading, error } = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [menuOpen, setMenuOpen] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: '', image: '', designation: '', phone: '', status: 'Pending' });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getEmployees(); 
  }, []);

  const handleSearch = (value) => {
    setSearchTerm(value);
    searchEmployees(value);
  };

  const toggleMenu = (userId) => {
    setMenuOpen(menuOpen === userId ? null : userId);
  };

  const handleDelete = (userId) => {
    deleteEmployee(userId);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData(user);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveEmployee(formData, editingUser);
    setShowModal(false);
  };

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <input
          type="text"
          placeholder="Search by role..."
          className="form-control w-50"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <button onClick={() => setShowModal(true)} className="btn btn-primary">Add Profile</button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-danger">{error}</p>}

      <div className="row">
        {employeesData.map(user => (
          <div key={user._id} className="col-md-6 col-lg-6 mb-2">
            <div className="card shadow-sm position-relative">
              <div className="position-absolute top-0 end-0 p-2" onClick={() => toggleMenu(user._id)} style={{ cursor: 'pointer' }}>
                <FaEllipsisV />
              </div>

              {menuOpen === user._id && (
                <div className="dropdown-menu show">
                  <button onClick={() => handleEdit(user)} className="dropdown-item">Edit</button>
                  <button onClick={() => handleDelete(user._id)} className="dropdown-item text-danger">Delete</button>
                </div>
              )}

              <div className="d-flex align-items-center p-2">
                <img src={user.image} alt={user.name} className="rounded-circle me-3" style={{ width: '50px', height: '50px' }} />
                <div>
                  <h5 className="mb-0">{user.name}</h5>
                  <p className="mb-0 text-muted">{user.designation}</p>
                </div>
              </div>
              <div className="card-body">
                <p><strong>Phone:</strong> {user.phone}</p>
                <p><strong>Status:</strong> {user.status ? "Active" : "Inactive"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingUser ? 'Edit Profile' : 'Add Profile'}</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Name"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Image URL"
                      className="form-control"
                      value={formData.image}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Designation"
                      className="form-control"
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <select
                      className="form-select"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button type="button" className="btn btn-secondary me-2" onClick={() => setShowModal(false)}>Cancel</button>
                    <button type="submit" className="btn btn-primary">Save</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FetchEmp;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useDeactivateUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import useUserData from "../../hooks/useUserData";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";

const fieldCss =
  "border border-gray-300 p-3 rounded w-1/6 shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500";

const Delete = () => {
  const { data: fetchedUsers, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: isDeletingUser }] = useDeleteUserMutation();
  const [deactivateUser, { isLoading: isDeactivatingUser }] =
    useDeactivateUserMutation();
  const {userData,userError} = useUserData();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userError) {
      navigate("/");
      dispatch(logout());
    }
  }, [navigate,userError,dispatch]);

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [filters, setFilters] = useState({
    username: "",
    email: "",
    role: "all", // "all", "admin", "user"
    status: "all", // "all", "active", "inactive"
  });

  useEffect(() => {
    // Fetch data when the component mounts
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers);
      console.log(fetchedUsers);
    }
    if (isLoading) {
      toast.info("Loading users data...", { autoClose: 2000 });
    } else if (error) {
      toast.error("Error Retrieving Users", { autoClose: 2000 });
    }
    if (fetchedUsers) {
      toast.dismiss();
    }
  }, [fetchedUsers, isLoading, error]);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id).unwrap();
      setUsers(users.filter((user) => user._id !== id));
      toast.success("User deleted successfully", { autoClose: 2000 });
    } catch (err) {
      toast.error("Error Deleting User", { autoClose: 2000 });
      console.log(err);
    }
  };

  const handleDeactivate = async (id, currentStatus) => {
    try {
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, isActive: !currentStatus } : user
        )
      );

      await deactivateUser(id).unwrap();
      toast.success(
        `User ${currentStatus ? "Deactivated" : "Activated"} successfully`,
        { autoClose: 2000 }
      );
    } catch (err) {
      setUsers(
        users.map((user) =>
          user._id === id ? { ...user, isActive: currentStatus } : user
        )
      );
      toast.error("Error Updating User", { autoClose: 2000 });
    }
  };

  useEffect(() => {
    if (users && userData?.data) {
      const filtered = users.filter((user) => {
        const matchesUsername = user.username
          .toLowerCase()
          .includes(filters.username.toLowerCase());
        const matchesEmail = user.email
          .toLowerCase()
          .includes(filters.email.toLowerCase());
        const matchesRole =
          filters.role === "all" ||
          (filters.role === "admin" && user.isAdmin) ||
          (filters.role === "user" && !user.isAdmin);
        const matchesStatus =
          filters.status === "all" ||
          (filters.status === "active" && user.isActivated) ||
          (filters.status === "inactive" && !user.isActivated);

        const isExcluded = user._id === userData.data._id;

        return (
          matchesUsername &&
          matchesEmail &&
          matchesRole &&
          matchesStatus &&
          !isExcluded
        );
      });

      setFilteredUsers((prevFilteredUsers) => {
        if (JSON.stringify(prevFilteredUsers) !== JSON.stringify(filtered)) {
          return filtered;
        }
        return prevFilteredUsers;
      });
    }
  }, [users, userData?.data, filters]);

  return (
    <div className="flex h-screen overflow-hidden font-poppins bg-gradient-to-r from-white to-gray-100">
      {/* Sidebar */}
      <Sidebar activeLink={"Delete"} />

      {/* Main Content */}
      <main className="flex-grow bg-white shadow-lg rounded-lg py-8 mx-3 my-6">
        <h1
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: "rgba(201, 92, 52, 1)" }}
        >
          User Management
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          <input
            type="text"
            placeholder="Filter by Username"
            className={fieldCss}
            value={filters.username}
            onChange={(e) =>
              setFilters({ ...filters, username: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Filter by Email"
            className={fieldCss}
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          />
          <select
            className={fieldCss}
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <select
            className={fieldCss}
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="all">All Statuses</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Table with Scroll and Sticky Header */}
        <div
          className="overflow-y-auto max-h-96 border-t border-gray-200"
          style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <table className="table-auto w-full bg-white">
            <thead>
              <tr
                style={{
                  backgroundColor: "rgba(201, 92, 52, 1)",
                  color: "white",
                  position: "sticky",
                  top: "0",
                  zIndex: "10",
                }}
              >
                <th className="p-4 text-left">Username</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Operations</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-100">
                  <td className="p-4">{user.username}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        user.isAdmin ? "bg-green-500" : "bg-blue-500"
                      }`}
                    >
                      {user.isAdmin ? "Admin" : "User"}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm ${
                        user.isActive ? "bg-red-500" : "bg-green-500"
                      }`}
                    >
                      {user.isActive ? "InActive" : "Active"}
                    </span>
                  </td>
                  <td className="p-4 flex gap-2">
                    <button
                      className="px-4 py-2 rounded shadow text-white bg-red-500 hover:bg-red-600"
                      onClick={() => handleDelete(user._id)}
                      disabled={isDeletingUser}
                    >
                      Delete
                    </button>
                    <button
                      className={`px-4 py-2 rounded shadow text-white ${
                        user.isActive
                          ? "bg-green-500 hover:bg-green-600"
                          : "bg-yellow-500 hover:bg-yellow-600"
                      }`}
                      onClick={() => handleDeactivate(user._id, user.isActive)}
                      disabled={isDeactivatingUser}
                    >
                      {user.isActive ? "Activate" : "Deactivate"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No users message */}
        {filteredUsers.length === 0 && (
          <p className="text-gray-500 mt-6 text-center text-lg">
            No users match the filters.
          </p>
        )}
      </main>
    </div>
  );
};

export default Delete;

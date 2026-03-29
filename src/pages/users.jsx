import UserTable from "../components/user/user.table";
import UserCreate from "../components/user/user.create";
import { fetchAllUsersAPI } from "../services/api.service";
import { useEffect, useState } from "react";

const UsersPage = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  // empty dependency array [] => only call 1 time when component mounts
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, pageSize]); // [] + currentPage + pageSize => call when component mounts + call when currentPage or pageSize changes

  const loadUser = async () => {
    const res = await fetchAllUsersAPI(currentPage, pageSize);
    if (res.data) {
      let data = res.data;
      setUserData(data.result);
      setCurrentPage(data.meta.current);
      setPageSize(data.meta.pageSize);
      setTotal(data.meta.total);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <UserCreate loadUser={loadUser} />
      <UserTable
        userData={userData}
        loadUser={loadUser}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        total={total}
      />
    </div>
  );
};

export default UsersPage;
